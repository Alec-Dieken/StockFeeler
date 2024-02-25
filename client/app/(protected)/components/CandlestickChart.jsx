"use client";

import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { Box } from "@mui/material";

const CandlestickChart = ({ data, width, height }) => {
    const chartRef = useRef();
    let chart;

    useEffect(() => {
        chart = createChart(chartRef.current, {
            width,
            height,
            layout: {
                background: {
                    type: "solid",
                    color: "#161c2b",
                },
                textColor: "rgba(255, 255, 255, 0.9)",
            },
            grid: {
                vertLines: {
                    color: "rgba(197, 203, 206, 0.5)",
                },
                horzLines: {
                    color: "rgba(197, 203, 206, 0.5)",
                },
            },
            rightPriceScale: {
                borderColor: "rgba(197, 203, 206, 0.8)",
            },
            timeScale: {
                borderColor: "rgba(197, 203, 206, 0.8)",
            },
        });
        const candleSeries = chart.addCandlestickSeries();

        const formattedData = data.map((item) => ({
            time: Math.floor(item.t / 1000),
            open: item.o,
            high: item.h,
            low: item.l,
            close: item.c,
        }));

        candleSeries.setData(formattedData);

        const resize = () => {
            chart.resize(chartRef.current.clientWidth, chartRef.current.clientHeight);
        };

        window.addEventListener("resize", resize);

        resize();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, [data]);

    return (
        <Box sx={{maxWidth: "800px"}}>
            <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
        </Box>
    );
};

export default CandlestickChart;
