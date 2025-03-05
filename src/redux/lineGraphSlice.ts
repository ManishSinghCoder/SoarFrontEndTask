import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


type LineGraphState = {
    lineLabels: string[];
    lineDatasets: number[];
    lineStatus: "idle" | "loading" | "succeeded" | "failed";
    lineError: string | null;
};

const initialState: LineGraphState = {
    lineLabels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    lineDatasets: [],
    lineStatus: "idle",
    lineError: null,
};

const mockFetchLineGraphData = (): Promise<number[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                320, 240, 480, 780, 220, 580, 640
            ]);
        }, 1500);
    });
};

export const fetchLineGraphData = createAsyncThunk(
    "lineGraph/fetchLineGraphData",
    async () => {
        return await mockFetchLineGraphData();
    }
);

const lineGraphSlice = createSlice({
    name: "lineGraph",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLineGraphData.pending, (state) => {
                state.lineStatus = "loading";
            })
            .addCase(
                fetchLineGraphData.fulfilled,
                (state, action: PayloadAction<number[]>) => {
                    state.lineStatus = "succeeded";
                    state.lineDatasets = action.payload;
                }
            )
            .addCase(fetchLineGraphData.rejected, (state, action) => {
                state.lineStatus = "failed";
                state.lineError = action.error.message ?? "Failed to fetch line graph data";
            });
    },
});

export default lineGraphSlice.reducer;
