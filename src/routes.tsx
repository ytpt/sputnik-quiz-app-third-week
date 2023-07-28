import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import { Alert } from "antd";

const AppLazy = lazy(() => import("./components/App/App"));

const RoutesConfig = () => {
    return (
        <>
            <Routes >
                <Route path="/" element={
                    <Suspense fallback={ <Alert message="Загрузка..." /> }>
                        <AppLazy />
                    </Suspense>
                } />
                <Route path="*" element={ <NotFoundPage /> } />
            </Routes>
        </>
    );
};

export default RoutesConfig;