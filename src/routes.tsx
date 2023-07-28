import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

const AppLazy = lazy(() => import("./components/App/App"));

const RoutesConfig = () => {
    return (
        <>
            <Routes >
                <Route path="/" element={
                    <Suspense fallback={<h2>Загрузка...</h2>}>
                        <AppLazy />
                    </Suspense>
                } />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default RoutesConfig;