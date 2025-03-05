import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PieDataset } from "../constent/type";

interface PieChartState {
    pieChartLabels: string[];
    pieChartDatasets: PieDataset[];
    pieChartStatus: "idle" | "loading" | "succeeded" | "failed";
    pieChartError: string | null;
};

const initialState: PieChartState = {
    pieChartLabels: ["Entertainment", "Bill Expense", "Others", "Investment"],
    pieChartDatasets: [],
    pieChartStatus: "idle",
    pieChartError: null,
};

const mockFetchPieChartData = (): Promise<PieDataset[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    data: [30, 15, 20, 35],
                    backgroundColor: ["#39447a", "#ff8c21", "#222222", "#4169e1"],
                    borderWidth: 0,
                    borderColor: "#ffffff",
                    offset: [50, 80, 15, 10],
                    hoverOffset: [70, 100, 35, 30],
                },
            ]);
        }, 1500);
    });
};

export const fetchPieChartData = createAsyncThunk(
    "pieChart/fetchPieChartData",
    async () => {
        return await mockFetchPieChartData();
    }
);

const pieChartSlice = createSlice({
    name: "pieChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPieChartData.pending, (state) => {
                state.pieChartStatus = "loading";
            })
            .addCase(
                fetchPieChartData.fulfilled,
                (state, action: PayloadAction<PieDataset[]>) => {
                    state.pieChartStatus = "succeeded";
                    state.pieChartDatasets = action.payload;
                }
            )
            .addCase(fetchPieChartData.rejected, (state, action) => {
                state.pieChartStatus = "failed";
                state.pieChartError = action.error.message ?? "Failed to fetch pie chart data";
            });
    },
});

export default pieChartSlice.reducer;
