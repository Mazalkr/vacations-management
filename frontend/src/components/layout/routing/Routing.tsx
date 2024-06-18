import Login from "../../auth/login/Login";
import Signup from "../../auth/signup/Signup";
import Home from "../../home/home/Home";
import Edit from "../../vacations/Edit/Edit";
import Add from "../../vacations/add/Add";
import List from "../../vacations/list/List";
import Report from "../../vacations/report/Report";
import Page404 from "../page404/Page404";
import { Routes, Route, Navigate } from 'react-router-dom';

function Routing(): JSX.Element {
    return (
        <Routes>

            <Route path="/signup" element={<Signup />} />
            
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/vacations" element={<List />} />
            <Route path="/vacations/add" element={<Add />} />
            <Route path="/vacations/edit/:vacationId" element={<Edit />} />
            <Route path="/vacations/report" element={<Report />} />
            <Route path="*" element={<Page404 />} />

        </Routes>

    );
}

export default Routing;
