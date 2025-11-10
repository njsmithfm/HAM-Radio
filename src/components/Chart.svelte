<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    export let data = []; // [{time: Date, kIndex: number}, ...]

    let svg;
    const width = 400,
        height = 200,
        margin = { top: 20, right: 30, bottom: 30, left: 40 };

    onMount(async () => {
        // fetch recent K‑index values (last 24 h) – optional helper
        const raw = await fetch(
            "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json",
        ).then((r) => r.json());

        const now = new Date();
        const dayAgo = new Date(now - 24 * 60 * 60 * 1000);
        data = raw
            .filter((d) => new Date(d.time_tag) > dayAgo)
            .map((d) => ({ time: new Date(d.time_tag), kIndex: +d.kp_index }));

        draw();
    });

    function draw() {
        const x = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => d.time))
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.kIndex)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const line = d3
            .line()
            .x((d) => x(d.time))
            .y((d) => y(d.kIndex));

        const svgEl = d3.select(svg).attr("viewBox", `0 0 ${width} ${height}`);

        svgEl
            .append("g")
            .attr("stroke", "#ff6600")
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("d", line);

        // axes
        svgEl
            .append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(5));

        svgEl
            .append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));
    }
</script>

<svg bind:this={svg}></svg>
