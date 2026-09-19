import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Login } from "../components/login.tsx";
import { useAuth } from "../context/authContext.tsx";
import { ProjectSection } from "../components/project.tsx";
import { IssueSection } from "../components/issuesSection.tsx";
import { useIssues } from "../context/issueContext.tsx";
import { ModalOverlay } from "../components/modal.tsx";
import * as CardModule from "../components/taskCard.tsx";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("../constext/authContext.tsx", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../constext/issueContext.tsx", () => ({
  useIssues: vi.fn(),
}));

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the login form", () => {
    useAuth.mockReturnValue({ login: vi.fn(), success: true });
    render(<Login />);

    expect(screen.getByText(/welcome!/i)).toBeInTheDocument();
    expect(
      document.querySelector('input[name="username"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('input[name="password"]'),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows error message when success is false", () => {
    useAuth.mockReturnValue({ login: vi.fn(), success: false });
    render(<Login />);

    const errorBox = screen.getByText(/wrong credentials!/i).closest("div");
    expect(errorBox).toHaveClass("showError");
  });

  test("hides error message when success is true", () => {
    useAuth.mockReturnValue({ login: vi.fn(), success: true });
    render(<Login />);

    const errorBox = screen.getByText(/wrong credentials!/i).closest("div");
    expect(errorBox).toHaveClass("hideError");
  });
});

describe("Dashbord", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders dashbord", () => {
    useAuth.mockReturnValue({ success: true, me: "Admin" });
    useIssues.mockReturnValue({
      createIssue: vi.fn(),
      deleteIssue: vi.fn(),
      issue: [],
    });
    render(<ProjectSection />);
    render(<IssueSection />);

    const Title = screen.getByText(/Active Projects/i);
    expect(Title).toBeVisible();
    const buttonElement = screen.getByRole("button", { name: /Add +/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("Issues render", () => {
    const renderSpy = vi.spyOn(CardModule, "TaskCard");
    useAuth.mockReturnValue({ success: true, me: "Admin" });
    useIssues.mockReturnValue({
      createIssue: vi.fn(),
      deleteIssue: vi.fn(),
      issue: [
        {
          IssueId: 1,
          title: "test",
        },
      ],
    });
    render(<ProjectSection />);
    render(
      <MemoryRouter>
        <IssueSection />
      </MemoryRouter>,
    );

    expect(renderSpy).toHaveBeenCalled();
  });
});

describe("Test Modal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Modal visible", async () => {
    render(<ModalOverlay open={true} setOpen={vi.fn()} />);

    const title = await screen.findByText(/New Issue/i);
    expect(title).toBeInTheDocument();
  });

  test("Modal submission", async () => {
    const user = userEvent.setup();
    render(<ModalOverlay open={true} setOpen={vi.fn()} />);

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    await user.click(submitButton);
    await waitFor(async () => {
      const tostMessage = screen.getByText(
        /assignee : Too small: expected string to have >=5 characters/i,
      );
      expect(tostMessage).toBeInTheDocument();
    });
  });
});
