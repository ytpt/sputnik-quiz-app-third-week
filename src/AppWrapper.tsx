import React, { FC, lazy, Suspense } from "react";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

const AppLazy = lazy(() => import("./components/App/App"));

export const AppWrapper: FC = () => {
    return (
        <BrowserRouter>
            <Provider store={ store }>
                <Routes>
                    <Route path="/" element={
                        <Suspense fallback={ <h2>Загрузка...</h2> }>
                            <AppLazy />
                        </Suspense> }
                    />
                    <Route path="*" element={ <NotFoundPage /> } />
                </Routes>
            </Provider>
        </BrowserRouter>
    )
};