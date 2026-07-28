import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeInquiryForm } from "../HomeInquiryForm";

function renderForm() {
  return render(
    <MemoryRouter>
      <HomeInquiryForm />
    </MemoryRouter>,
  );
}

async function completeContact(user: ReturnType<typeof userEvent.setup>) {
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
  await user.click(screen.getByRole("button", { name: /continue to event/i }));
}

async function completeEvent(user: ReturnType<typeof userEvent.setup>) {
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
  await user.click(screen.getByRole("button", { name: /review inquiry/i }));
}

describe("homepage inquiry form", () => {
  it("does not steal focus or scroll the page on initial render", () => {
    renderForm();

    expect(
      screen.getByRole("heading", { name: "Contact details" }),
    ).not.toHaveFocus();
  });

  it("starts on Contact and validates only contact fields", async () => {
    const user = userEvent.setup();
    renderForm();

    expect(
      screen.getByRole("heading", { name: "Contact details" }),
    ).toBeVisible();
    expect(screen.queryByLabelText(/event type/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /continue to event/i }));

    expect(
      (await screen.findAllByText(/first name is required/i))[0],
    ).toBeVisible();
    expect(screen.queryByText(/choose a preferred date/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toHaveFocus();
    expect(
      screen.getByRole("alert", { name: /validation summary/i }),
    ).toBeVisible();
  });

  it("advances to Event and Back preserves values while focusing the heading", async () => {
    const user = userEvent.setup();
    renderForm();
    await completeContact(user);

    const eventHeading = await screen.findByRole("heading", {
      name: "Event details",
    });
    await waitFor(() => expect(eventHeading).toHaveFocus());
    await user.click(screen.getByRole("button", { name: /back to contact/i }));

    const contactHeading = screen.getByRole("heading", {
      name: "Contact details",
    });
    await waitFor(() => expect(contactHeading).toHaveFocus());
    expect(screen.getByLabelText(/first name/i)).toHaveValue("Taylor");
    expect(screen.getByLabelText(/organization/i)).toHaveValue(
      "North Star Academy",
    );
  });

  it(
    "validates Event and prepares the honest local Review",
    async () => {
      const user = userEvent.setup();
      renderForm();
      await completeContact(user);
      await user.click(
        screen.getByRole("button", { name: /review inquiry/i }),
      );

      expect(
        (await screen.findAllByText(/select an approved event type/i))[0],
      ).toBeVisible();
      expect(screen.getByLabelText(/event type/i)).toHaveFocus();

      await completeEvent(user);

      const reviewHeading = await screen.findByRole("heading", {
        name: /review your inquiry/i,
      });
      await waitFor(() => expect(reviewHeading).toHaveFocus());
      expect(
        screen.getByText(/this static website cannot send it for you/i),
      ).toBeVisible();
      expect(
        screen.getByRole("button", { name: /open email draft/i }),
      ).toBeVisible();
    },
    15_000,
  );

  it(
    "clears a prepared review when the organizer edits Event details",
    async () => {
      const user = userEvent.setup();
      renderForm();
      await completeContact(user);
      await completeEvent(user);
      expect(
        await screen.findByRole("heading", { name: /review your inquiry/i }),
      ).toBeVisible();

      await user.click(
        screen.getByRole("button", { name: /edit event details/i }),
      );

      expect(
        screen.queryByRole("heading", { name: /review your inquiry/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Event details" }),
      ).toBeVisible();
      expect(screen.getByLabelText(/short message/i)).toHaveValue(
        "We are planning a student leadership program focused on purposeful action.",
      );
    },
    15_000,
  );

  it("keeps the full booking route available without browser persistence", () => {
    renderForm();
    expect(
      screen.getByRole("link", { name: /open the full booking form/i }),
    ).toHaveAttribute("href", "/book-damon");
    expect(localStorage.getItem("home-inquiry")).toBeNull();
  });
});
