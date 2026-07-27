import type { ComponentType } from "react";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

async function loadForm() {
  const moduleUrl = pathToFileURL(
    resolve("src/components/booking/HomeInquiryForm.tsx"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    HomeInquiryForm: (() => null) as ComponentType,
  }));
}

describe("homepage inquiry form", () => {
  it("shows field-level errors instead of implying a submission", async () => {
    const { HomeInquiryForm } = await loadForm();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomeInquiryForm />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: /review inquiry/i }),
    );

    expect(
      await screen.findByText(/first name is required/i),
    ).toBeVisible();
    expect(
      screen.queryByText(/inquiry sent/i),
    ).not.toBeInTheDocument();
  });

  it("reviews a valid inquiry with the static-delivery disclosure", async () => {
    const { HomeInquiryForm } = await loadForm();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomeInquiryForm />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/first name/i), "Taylor");
    await user.type(screen.getByLabelText(/last name/i), "Morgan");
    await user.type(
      screen.getByLabelText(/work email/i),
      "taylor@example.org",
    );
    await user.type(
      screen.getByLabelText(/organization/i),
      "North Star Academy",
    );
    await user.selectOptions(
      screen.getByLabelText(/event type/i),
      "School or college program",
    );
    await user.type(screen.getByLabelText(/preferred date/i), "2027-10-10");
    await user.type(
      screen.getByLabelText(/short message/i),
      "We are planning a student leadership program focused on purposeful action.",
    );
    await user.click(screen.getByLabelText(/this demo prepares an email/i));
    await user.click(
      screen.getByRole("button", { name: /review inquiry/i }),
    );

    expect(
      await screen.findByRole("heading", { name: /review your inquiry/i }),
    ).toBeVisible();
    expect(
      screen.getByText(/this static website cannot send it for you/i),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: /open email draft/i }),
    ).toBeVisible();
  });
});
