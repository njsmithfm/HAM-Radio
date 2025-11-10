<script>
    import { onMount } from "svelte";
    import { weather, solar, sun, loadAll } from "../stores";
    import WeatherCard from "../components/WeatherCard.svelte";
    import SolarCard from "../components/SolarCard.svelte";
    import Chart from "../components/Chart.svelte";

    onMount(() => {
        loadAll(); // initial load
        const interval = setInterval(loadAll, 60 * 60 * 1000); // refresh hourly
        return () => clearInterval(interval);
    });
</script>

<main class="dashboard">
    <section class="cards">
        <WeatherCard {$weather} />
        <SolarCard {$solar} />
        <div class="sun-times">
            <h3>Daylight</h3>
            <p>Sunrise: {$sun.sunrise?.toLocaleTimeString()}</p>
            <p>Sunset: {$sun.sunset?.toLocaleTimeString()}</p>
        </div>
    </section>

    <!-- Example D3 chart: K‑index over last 24 h -->
    <Chart {data} />
</main>

<style>
    /* Minimal layout – feel free to expand */
    .dashboard {
        padding: 1rem;
        font-family: system-ui;
    }
    .cards {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
</style>
