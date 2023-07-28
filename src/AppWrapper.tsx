import React, { FC } from "react";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes";

export const AppWrapper: FC = () => {
    return (
        <BrowserRouter>
            <Provider store={ store }>
                <RoutesConfig />
            </Provider>
        </BrowserRouter>
    );
};