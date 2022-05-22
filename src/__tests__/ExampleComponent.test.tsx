import { render } from "@testing-library/react-native"
import { ExampleComponent } from "./ExampleComponent"

it("renders correctly", () => {
  const rendered = render(<ExampleComponent />)
  expect(rendered.toJSON()).toMatchSnapshot()
})
