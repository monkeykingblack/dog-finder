import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { vi } from "vitest";

import { getBreedImages } from "../../api/getBreedImages";
import { voteImage } from "../../api/voteImage";
import Card from "./Card";

// Mock external dependencies
vi.mock("../../api/getBreedImages");
vi.mock("../../api/voteImage");
vi.mock("@lordicon/react", () => ({
  Player: vi.fn(() => null),
}));

const mockBreedData = {
  data: [
    {
      breeds: [
        {
          weight: {
            imperial: "30 - 45",
            metric: "14 - 20",
          },
          height: {
            imperial: "18 - 22",
            metric: "46 - 56",
          },
          id: 50,
          name: "Border Collie",
          bredFor: "Sheep herder",
          breedGroup: "Herding",
          lifeSpan: "12 - 16 years",
          temperament:
            "Tenacious, Keen, Energetic, Responsive, Alert, Intelligent",
        },
      ],
      id: "lpqw_Acag",
      url: "https://cdn2.thedogapi.com/images/lpqw_Acag.jpg",
      width: 1080,
      height: 1080,
    },
  ],
};
describe("Card Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getBreedImages).mockResolvedValue(mockBreedData as any);
  });

  it("should render loading state initially", () => {
    act(() => {
      render(<Card />);
    });
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should fetch and display breed data", async () => {
    render(<Card />);

    await waitFor(() => {
      expect(screen.getByText("Border Collie")).toBeInTheDocument();
      expect(screen.getByText("Sheep herder")).toBeInTheDocument();
    });

    expect(getBreedImages).toHaveBeenCalledWith({
      format: "json",
      hasBreeds: true,
      size: "small",
    });
  });

  it("should toggle expanded view when clicking show more/less", async () => {
    render(<Card />);

    await waitFor(() => {
      expect(screen.getByText("Border Collie")).toBeInTheDocument();
    });

    // Initially in collapsed state
    expect(screen.queryByText("Life Span")).not.toBeInTheDocument();

    // Click show more
    act(() => {
      fireEvent.click(screen.getByText("[Show more]"));
    });

    // Verify expanded content
    expect(screen.getByText("Life Span")).toBeInTheDocument();
    expect(screen.getByText("12 - 16 years")).toBeInTheDocument();

    // Click show less
    act(() => {
      fireEvent.click(screen.getByText("[Show less]"));
    });

    // Verify collapsed state
    expect(screen.queryByText("Life Span")).not.toBeInTheDocument();
  });

  it("should handle voting interactions", async () => {
    render(<Card />);

    await waitFor(() => {
      expect(screen.getByText("Border Collie")).toBeInTheDocument();
    });

    const buttons = screen.getAllByRole("button");
    const [superLikeButton, likeButton, dislikeButton] = buttons;

    // Test like
    act(() => {
      fireEvent.click(likeButton);
    });

    expect(voteImage).toHaveBeenCalledWith({
      imageId: "lpqw_Acag",
      value: 1,
    });

    // Test super like
    act(() => {
      fireEvent.click(superLikeButton);
    });

    expect(voteImage).toHaveBeenCalledWith({
      imageId: "lpqw_Acag",
      value: 2,
    });

    // Test dislike
    act(() => {
      fireEvent.click(dislikeButton);
    });

    expect(voteImage).toHaveBeenCalledWith({
      imageId: "lpqw_Acag",
      value: -1,
    });

    // Verify refetch is called after each vote
    expect(getBreedImages).toHaveBeenCalledTimes(4); // Initial + 3 votes
  });
});
