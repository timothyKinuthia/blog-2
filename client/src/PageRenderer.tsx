import React from 'react';
import { useParams } from "react-router-dom";
import NOTFOUND from './components/NOTFOUND';
import { IParams } from "./helpers/Typescript";

const generatePage = (name: string) => {

    const component = () => require(`./pages/${name}`).default;

    try {
        return React.createElement(component());
    } catch (err) {
        return <NOTFOUND />
    }
};

const PageRenderer = () => {

    const { page, slug }: IParams = useParams();

    let name = '';

    if (page) {
        name = slug ? `${page}/[slug]` : `${page}`
    };

    return generatePage(name);
}

export default PageRenderer
