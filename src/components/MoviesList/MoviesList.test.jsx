import React from 'react';
jest.mock('node-fetch');

// import fetch, { Response } from 'node-fetch';

import { createShallow } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';
import MoviesList from './MoviesList';
import toJson from "enzyme-to-json"

describe("<MoviesList />", () => {
    const renderShallowUntilComponent = createShallow({ "untilSelector": "MoviesList" })
    let Component
    beforeEach(() => {

        Component = renderShallowUntilComponent(<ThemeProvider theme={{ success: { main: '#fff' } }}><MoviesList /></ThemeProvider>)
    })

    it("loads", () => {
        expect(typeof Component).toBe("object")
    })

    it("has a <Grid> container", () => {
        expect(Component.find("WithStyles(ForwardRef(Grid))[container=true]").length).toBeGreaterThanOrEqual(1)
    })


    it("has a <List> container", () => {
        expect(Component.find("WithStyles(ForwardRef(List))").length).toBeGreaterThanOrEqual(1)
    })

    it("snapshots", () => {
        expect(toJson(Component)).toMatchSnapshot()
    })
})
