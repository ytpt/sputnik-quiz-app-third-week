import React, { useEffect, useState, FC, useMemo } from "react";
import { Timer } from "./QuestionsArray.styles";
import QuestionCard from "../QuestionCard/QuestionCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { shuffleArray } from "../../utils";
import PaginationButton from "../PaginationButton/PaginationButton";
import Results from "../Results/Results";
import LogoutButton from "../LogoutButton/LogoutButton";
import { handleCheckboxClicked, handleErrorMessage, handleScoreShown, handleStartQuiz, handleTimeExpired, handleTimerActive, resetUserScore, handleNextPage, handlePrevPage } from "../../redux/actions";

type SelectedAnswers = {
    [questionNumber: number]: string | null;
}

const QuestionsArray: FC = () => {

    const dispatch = useDispatch();
    const newQuestions = useSelector((state: RootState) => state.questions);
    const userScore = useSelector((state: RootState) => state.userScore.user_score);
    const userAuthStatus = useSelector((state: RootState) => state.userStatus.user_auth);
    const isGameStarted = useSelector((state: RootState) => state.isGameStarted.is_game_started);
    const activeTimer = useSelector((state: RootState) => state.isTimerActive.is_timer_active);
    const isScoreShown = useSelector((state: RootState) => state.isScoreShown.is_score_shown);
    const page = useSelector((state: RootState) => state.pageUpdate.page);

    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
    const [remainingTime, setRemainingTime] = useState<number>(30);

    const totalQuestionsCount = newQuestions.length;
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = async () => {
        setSelectedAnswers({});
        dispatch(resetUserScore(0));
        dispatch(handleCheckboxClicked(false));
        dispatch(handleStartQuiz(true));
        dispatch(handleTimerActive(true));
        dispatch(handleScoreShown(false));
        dispatch(handleTimeExpired(false));
        dispatch(handleErrorMessage(""));
        timer();
    }

    const prevPage = () => dispatch(handlePrevPage(1));
    const nextPage = () => dispatch(handleNextPage(1));

    const shuffledQuestions = useMemo(() => {
        return newQuestions
            .slice(startIndex, endIndex)
            .map((question) => ({
                ...question,
                answers: shuffleArray([
                    ...question.incorrect_answers,
                    question.correct_answer
                ])
            }));
    }, [newQuestions, startIndex, endIndex]);

    let interval: ReturnType<typeof setTimeout>;

    const timer = (minutes: number = 0.5) => {
        const initialSeconds = minutes * 60 || 0;
        setRemainingTime(initialSeconds);
        dispatch(handleTimerActive(true));

        interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    dispatch(handleTimerActive(false));
                    dispatch(handleScoreShown(true));
                    dispatch(handleTimeExpired(true));
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    }

    const handleSelectAnswer = (questionNumber: number, answer: string) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionNumber]: answer,
        }));
    };

    return (
        <>
            <Timer>
                { isGameStarted && remainingTime >= 0 && (<h3>Осталось времени: { remainingTime }</h3>) }
            </Timer>
            {/*Questions*/}
            {
                isGameStarted
                && shuffledQuestions.map((question, index) => (
                    <QuestionCard
                        key={ index }
                        questionNumber={ index + startIndex }
                        question={ question.question }
                        answers={ [...question.incorrect_answers, question.correct_answer] }
                        right={ question.correct_answer }
                        selectedAnswer={ selectedAnswers[index + startIndex] || null }
                        setSelectedAnswer={ (answer) => handleSelectAnswer(index + startIndex, answer) }
                    />
                ))
            }
            {/*Pagination*/}
            {
                isGameStarted && newQuestions.length > endIndex && !isScoreShown
                    && <PaginationButton onClick={ nextPage } value="Следующая страница" />
                    || page > 1
                        && <PaginationButton onClick={ prevPage } value="Предыдущая страница" />
            }
            {/*Results*/}
            {
                isGameStarted && !activeTimer
                    && <Results
                        userScore={ userScore }
                        totalQuestionsCount={ totalQuestionsCount }
                        startNewGame={ startNewGame }
                    />
            }
            {/*Logout*/}
            { isGameStarted && userAuthStatus && <LogoutButton value="Выход" /> }
        </>
    )
};

export default React.memo(QuestionsArray);