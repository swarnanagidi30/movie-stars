import React from 'react';
jest.mock('node-fetch');

// import fetch, { Response } from 'node-fetch';

import { createShallow } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';
import CharacterSelect from './CharacterSelect';
import toJson from "enzyme-to-json"

describe("<CharacterSelect />", () => {
    const renderShallowUntilComponent = createShallow({ "untilSelector": "CharacterSelect" })
    let Component
    beforeEach(() => {

        Component = renderShallowUntilComponent(<ThemeProvider theme={{ success: { main: '#fff' } }}><CharacterSelect /></ThemeProvider>)
    })

    it("loads", () => {
        expect(typeof Component).toBe("object")
    })

    it("has a <Autocomplete> container", () => {
        expect(Component.find("WithStyles(ForwardRef(Autocomplete))").length).toBeGreaterThanOrEqual(1)
    })

    it("snapshots", () => {
        expect(toJson(Component)).toMatchSnapshot()
    })
})
