import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Layout, Spin } from "antd";
import Sider from "./components/Sider";
import Header from "./components/Header";
import Map from "./components/Map/Map";
const Home = React.lazy(()=> import('./pages/Home'))

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="main bg-slate-50">
        <Header />
        <div className="h-full max-h-[85vh] flex flex-row">
          <Sider />
          <Suspense fallback={<Spin tip="Loading..." />}>
            <Layout.Content className="m-6 overflow-y-auto ">
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                </Route>
              </Routes>
            </Layout.Content>
          </Suspense>
        </div>
        <div>Footer</div>
      </div>
    </BrowserRouter>
  );
};

export default App;
