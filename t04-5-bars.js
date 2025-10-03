// t04-5-bars.js
const createBarChart = (data) => {
    // --- Sizes (logical vs. display) ---
    const viewW = 500;
    const viewH = Math.max(220, data.length * 28); // scale height by #rows
    const displayW = 640;
    const displayH = Math.min(480, data.length * 24 + 40);
  
    // --- SVG root ---
    const svg = d3.select(".responsive-svg-container")
      .append("svg")
      .attr("viewBox", `0 0 ${viewW} ${viewH}`)
      .attr("width", displayW)
      .attr("height", displayH)
      .style("border", "1px solid #ccc");
  
    // --- Scales (from T04-6) ---
    const xMax = d3.max(data, d => d.count);
    const xScale = d3.scaleLinear()
      .domain([0, xMax])
      .range([0, viewW]);
  
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.brand)) // adjust column name if needed
      .range([0, viewH])
      .paddingInner(0.2)
      .paddingOuter(0.1);
  
    // OLD rectangle-only drawing block (COMMENTED OUT)
    /*
    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("class", d => `bar bar-${d.count}`)
      .attr("x", 0)
      .attr("y", d => yScale(d.brand))
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("fill", "steelblue");
    */
  
    // --- NEW grouped bars with labels ---
    const labelX = 100; // left margin for text
  
    const barAndLabel = svg
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.brand)})`);
  
    // Bar rectangle inside each group
    barAndLabel.append("rect")
      .attr("x", labelX) // bars start at 100px
      .attr("y", 0)
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("fill", "steelblue");
  
    // Category text (left side of bar, aligned at 100px)
    barAndLabel.append("text")
      .text(d => d.brand)
      .attr("x", labelX)
      .attr("y", 15) // tweak to vertically center
      .attr("text-anchor", "end")
      .style("font-family", "sans-serif")
      .style("font-size", "13px");
  
    // Value text (just past the end of each bar)
    barAndLabel.append("text")
      .text(d => d.count)
      .attr("x", d => labelX + xScale(d.count) + 4)
      .attr("y", 12) // tweak to align with bar
      .style("font-family", "sans-serif")
      .style("font-size", "13px");
  };
  