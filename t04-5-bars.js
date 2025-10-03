// t04-5-bars.js
const createBarChart = (data) => {
    // Step 1: Add an SVG inside our container
    const svg = d3.select(".responsive-svg-container")
      .append("svg")
      .attr("viewBox", "0 0 1200 400") // SVG width=1200, height=400 (scalable)
      .style("border", "1px solid black"); // dev-only, to see boundary
  
    // Step 2: Bind data → create <rect> for each row
    svg
        .selectAll("rect")
        .data(data)         // hook up array of objects
        .join("rect")      // create <rect> elements
            .attr("class", d => `bar bar-${d.count}`)
            .attr("width", d => d.count) // uses your numeric column directly
            .attr("height", 16) // constant bar height
            .attr("x", 0)                             // start all bars at x=0
            .attr("y", (d, i) => i * 20);             // space out by index        
        // Close the createBarChart function
    };
