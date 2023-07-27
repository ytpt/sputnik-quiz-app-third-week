import React, { useState, FC }  from "react";
import { Form, Input, Alert } from "antd";
import AuthService from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FormButton from "../FormButton/FormButton";
import { FormInstance } from "antd";
import Cookies from "js-cookie";
import { handleErrorMessage, handleLoaderActive, handleSetUser, handleUserAuth, handleUserReg } from "../../redux/actions";

type Props = {};

type FormData = {
    email: string;
    password: string;
};

const LoginForm: FC<Props> = () => {

    const dispatch = useDispatch();
    const userRegStatus = useSelector((state: RootState) => state.userStatus.user_reg);
    const errorMessage = useSelector((state: RootState) => state.errorMessage.error_message);
    const loader = useSelector((state: RootState) => state.isLoaderActive.is_loader_active);

    const [form] = Form.useForm<FormInstance>();
    const [formData, setFormData] = useState<FormData | null>(null);

    const setUserAuth = (isRegistration) => {
        dispatch(isRegistration ? handleUserReg(true) : handleUserAuth(true))
    }

    const setSuccessMessage = (isRegistration, response) => {
        dispatch(
            isRegistration
                ? handleErrorMessage(`Пользователь ${response.data.user.email} зарегистрирован`)
                : handleErrorMessage(`Вы вошли как ${response.data.user.email}`)
        )
    }

    const setErrorMessage = (isRegistration) => {
        dispatch(
            isRegistration
                ? handleErrorMessage(`Ошибка регистрации`)
                : handleErrorMessage(`Ошибка авторизации`)
        )
    }

    const performAuth = async (email: string, password: string, isRegistration: boolean) => {
        dispatch(handleLoaderActive(true));
        try {
            const response = isRegistration
                ? await AuthService.registration(email, password)
                : await AuthService.login(email, password);
            Cookies.set("token", response.data.accessToken);
            Cookies.set("login", response.data.user.email);
            setUserAuth(isRegistration);
            setSuccessMessage(isRegistration, response);
            dispatch(handleSetUser(response.data.user));
        } catch (e) {
            setErrorMessage(isRegistration);
        } finally {
            dispatch(handleLoaderActive(false));
        }
    }

    const formValidation = async (values: any) => {
        userRegStatus
            ? await performAuth(values.email, values.password, false)
            : await performAuth(values.email, values.password, true)
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Form
            form={ form }
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={ formValidation }
        >
            <Form.Item
                label="E-mail"
                name="email"
                hasFeedback
                rules={[
                    { required: true, message: "Введите e-mail!"  },
                    { type: "email", message: "Невалидный e-mail" },
                ]}
            >
                <Input
                    type="text"
                    value={ formData ? formData.email : "" }
                    onChange={ onInputChange }
                />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                hasFeedback
                rules={[
                    { required: true, message: "Введите пароль!" },
                    { whitespace: true, message: "Пароль не должен содержать пробелы!" },
                    { min: 3, message: "Пароль должен содержать не менее 3 символов!" },
                ]}
            >
                <Input.Password
                    type="password"
                    value={ formData ? formData.password : "" }
                    onChange={ onInputChange }
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <FormButton
                    value={ userRegStatus ? "Вход" : "Регистрация" }
                    onClick={ form.submit }
                    disabled={
                        !form.isFieldsTouched(true) || form.getFieldsError()
                            .filter(({ errors }) => errors.length).length > 0
                    }
                />
            </Form.Item>
            { !loader && (errorMessage && <Alert message={ errorMessage } />) }
        </Form>
    )
}

export default React.memo(LoginForm);