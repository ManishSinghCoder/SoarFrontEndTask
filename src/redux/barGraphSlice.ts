import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Dataset } from "../constent/type";



interface ChartState {
    dipositeWithdrawLabels: string[]
    dipositWithdrawDatasets: Dataset[]
    barStatus: "idle" | "loading" | "succeeded" | "failed"
    barError: string | null
};

const initialState: ChartState = {
    dipositeWithdrawLabels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    dipositWithdrawDatasets: [],
    barStatus: "idle",
    barError: null,
};

const mockFetchBarGraphData = (): Promise<Dataset[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    label: "Withdraw",
                    data: [450, 340, 310, 450, 140, 380, 390, 290],
                    backgroundColor: "#232323",
                    borderRadius: 30,
                    borderSkipped: false,
                    barPercentage: 0.3,
                    categoryPercentage: 0.6,
                    order: 1,
                },
                {
                    label: "Deposit",
                    data: [230, 120, 250, 370, 230, 220, 330, 230],
                    backgroundColor: "#396AFF",
                    borderRadius: 30,
                    borderSkipped: false,
                    barPercentage: 0.3,
                    categoryPercentage: 0.6,
                    order: 2,
                }
            ]);
        }, 1500);
    });
};

export const fetchBarGraphData = createAsyncThunk(
    "barGraph/fetchBarGraphData",
    async () => {
        return await mockFetchBarGraphData();
    }
);

const chartSlice = createSlice({
    name: "barGraph",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBarGraphData.pending, (state) => {
                state.barStatus = "loading";
            })
            .addCase(
                fetchBarGraphData.fulfilled,
                (state, action: PayloadAction<Dataset[]>) => {
                    state.barStatus = "succeeded";
                    state.dipositWithdrawDatasets = action.payload;
                }
            )
            .addCase(fetchBarGraphData.rejected, (state, action) => {
                state.barStatus = "failed";
                state.barError = action.error.message ?? "Failed to fetch bar graph data";
            });
    },
});

export default chartSlice.reducer;
