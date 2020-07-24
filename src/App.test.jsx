import React from 'react';
jest.mock('node-fetch');

// import fetch, { Response } from 'node-fetch';
// import { render } from '@testing-library/react';

import { createShallow } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import toJson from "enzyme-to-json"

// test('renders Name / Year last Movie link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/Name \/ Year last Movie/i);
//   expect(linkElement).toBeInTheDocument();
// });




describe("<App />", () => {
  const renderShallowUntilComponent = createShallow({ "untilSelector": "App" })
  let Component
  beforeEach(() => {

    Component = renderShallowUntilComponent(<ThemeProvider theme={{ success: { main: '#fff' } }}><App /></ThemeProvider>)
  })

  it("loads", () => {
    expect(typeof Component).toBe("object")
  })

  it("has a <CharacterSelect> container", () => {
    expect(Component.find("CharacterSelect").length).toBeGreaterThanOrEqual(1)
  })

  it("has a <MoviesList> container", () => {
    expect(Component.find("MoviesList").length).toBeGreaterThanOrEqual(1)
  })

  it("has a <TextField> container", () => {
    expect(Component.find("WithStyles(ForwardRef(TextField))").length).toBeGreaterThanOrEqual(1)
  })

  it("snapshots", () => {
    expect(toJson(Component)).toMatchSnapshot()
  })
})
