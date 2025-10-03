// t04-5-bars.js
const createBarChart = (data) => {
    // --- logical (viewBox) size ---
    const viewW = 500;   // narrow width on purpose, so scaling matters
    const viewH = 1600;  // tall enough for many bars
  
    // --- physical (on screen) size ---
    const displayW = 640; 
    const displayH = 420;
  
    const svg = d3.select(".responsive-svg-container")
      .append("svg")
      .attr("viewBox", `0 0 ${viewW} ${viewH}`) // logical coordinates
      .attr("width", displayW)                  // what you see
      .attr("height", displayH)                 // what you see
      .style("border", "1px solid black");
  
    // --- x scale: numeric (count) ---
    const xMax = d3.max(data, d => d.count);
    const xScale = d3.scaleLinear()
      .domain([0, xMax])   // data space
      .range([0, viewW]);  // pixels in SVG space
  
    // --- y scale: categorical (brands/tech) ---
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.brand)) // category column name
      .range([0, viewH])              // logical vertical space
      .paddingInner(0.2)              // spacing between bars
      .paddingOuter(0.1);
  
    // --- draw bars ---
    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("class", d => `bar bar-${d.count}`)
      .attr("x", 0) // all start from left
      .attr("y", d => yScale(d.brand)) // vertical pos by brand
      .attr("width", d => xScale(d.count)) // width scaled to fit
      .attr("height", yScale.bandwidth())  // band height
      .attr("fill", "steelblue");
  };
  