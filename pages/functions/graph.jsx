import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function createCareerForceGraph(container) {
  if (!container) return;
  
  // Clear any existing SVG content
  d3.select(container).selectAll("*").remove();
  
  // Data structure
  const data = {
    nodes: [
      // Person (center)
      { id: "You", group: 0, radius: 30 },
      
      // Companies
      { id: "Zilliant", group: 1, radius: 20 },
      { id: "Planview", group: 1, radius: 20 },
      { id: "Texas State University", group: 1, radius: 20 },
      
      // Skills for Planview
      { id: "Graph", group: 2, radius: 12 },
      { id: "LLM", group: 2, radius: 12 },
      { id: "Agent Development", group: 2, radius: 12 },
      { id: "React Development", group: 2, radius: 12 },
      
      // Skills for Zilliant
      { id: "Pricing Optimization", group: 2, radius: 12 },
      { id: "Python", group: 2, radius: 12 },
      { id: "Cloud Ops", group: 2, radius: 12 },
      
      // Skills for Texas State
      { id: "Research", group: 2, radius: 12 },
      { id: "Teaching", group: 2, radius: 12 }
    ],
    links: [
      // Person to Companies
      { source: "You", target: "Zilliant", value: 5 },
      { source: "You", target: "Planview", value: 5 },
      { source: "You", target: "Texas State University", value: 5 },
      
      // Planview to Skills
      { source: "Planview", target: "Graph", value: 3 },
      { source: "Planview", target: "LLM", value: 3 },
      { source: "Planview", target: "Agent Development", value: 3 },
      { source: "Planview", target: "React Development", value: 3 },
      
      // Zilliant to Skills
      { source: "Zilliant", target: "Pricing Optimization", value: 3 },
      { source: "Zilliant", target: "Python", value: 3 },
      { source: "Zilliant", target: "Cloud Ops", value: 3 },
      
      // Texas State to Skills
      { source: "Texas State University", target: "Research", value: 3 },
      { source: "Texas State University", target: "Teaching", value: 3 }
    ]
  };

  // Colors - Apple-esque palette
  const colors = {
    person: "#007AFF", // iOS blue
    company: "#FF9500", // iOS orange
    skill: "#5AC8FA"    // iOS light blue
  };

  // Define SVG dimensions and settings
  const width = 800;
  const height = 600;
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  
  // Create SVG
  const svg = d3.select(container)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;");
  
  // Add a subtle gradient background
  const defs = svg.append("defs");
  const gradient = defs.append("linearGradient")
    .attr("id", "bg-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%");
  
  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#f9f9f9");
  
  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#f2f2f2");
  
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "url(#bg-gradient)");
  
  // Create force simulation
  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(d => {
      // Adjust distances based on node types
      if (d.source.group === 0 && d.target.group === 1) return 120;
      if (d.source.group === 1 && d.target.group === 2) return 80;
      return 100;
    }))
    .force("charge", d3.forceManyBody().strength(d => {
      // Adjust repulsion based on node type
      if (d.group === 0) return -500; // Person (center)
      if (d.group === 1) return -300; // Companies
      return -100; // Skills
    }))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(d => d.radius * 1.5));
  
  // Create container for all graph elements
  const graphContainer = svg.append("g");
  
  // Create links
  const link = graphContainer.append("g")
    .attr("stroke", "#cccccc")
    .attr("stroke-opacity", 0.5)
    .selectAll("line")
    .data(data.links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));
  
  // Create node containers
  const node = graphContainer.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .join("g")
    .call(drag(simulation));
  
  // Add shadow filter
  const filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");
  
  filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3)
    .attr("result", "blur");
  
  filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 2)
    .attr("dy", 2)
    .attr("result", "offsetBlur");
  
  const feComponentTransfer = filter.append("feComponentTransfer")
    .attr("in", "offsetBlur")
    .attr("result", "shadow");
    
  feComponentTransfer.append("feFuncA")
    .attr("type", "linear")
    .attr("slope", 0.2);
  
  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode")
    .attr("in", "shadow");
  feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
  
  // Add circles
  node.append("circle")
    .attr("r", d => d.radius)
    .attr("fill", d => {
      if (d.group === 0) return colors.person;
      if (d.group === 1) return colors.company;
      return colors.skill;
    })
    .attr("filter", "url(#drop-shadow)")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.8);
  
  // Add labels
  node.append("text")
    .text(d => d.id)
    .attr("x", 0)
    .attr("y", d => d.group === 0 ? d.radius + 20 : (d.group === 1 ? d.radius + 18 : d.radius + 16))
    .attr("text-anchor", "middle")
    .attr("fill", "#333333")
    .attr("font-weight", d => d.group === 0 ? 600 : (d.group === 1 ? 500 : 400))
    .attr("font-size", d => d.group === 0 ? 16 : (d.group === 1 ? 14 : 12))
    .attr("pointer-events", "none");
  
  // Add detailed tooltips
  node.append("title")
    .text(d => {
      // Return just the ID for the person and companies
      if (d.group === 0 || d.group === 1) return d.id;
      
      // For skills, return detailed descriptions
      const descriptions = {
        // Planview skills
        "Graph": "5+ years experience with graph databases and visualization. Built enterprise knowledge graphs and recommendation systems.",
        "LLM": "3 years working with large language models. Developed custom fine-tuning pipelines and integrated models with business applications.",
        "Agent Development": "2 years creating autonomous AI agents. Designed multi-agent systems for workflow automation and complex decision-making.",
        "React Development": "4 years of frontend development with React. Created component libraries and enterprise-grade applications.",
        
        // Zilliant skills
        "Pricing Optimization": "3 years developing algorithmic pricing models. Implemented dynamic pricing strategies that increased revenue by 15%.",
        "Python": "7 years of Python development. Built data pipelines, ML models, and automation tools for enterprise clients.",
        "Cloud Ops": "4 years managing cloud infrastructure. Designed scalable architectures on AWS and Azure for high-availability systems.",
        
        // Texas State skills
        "Research": "Published 6 papers on AI ethics and machine learning. Led research team exploring responsible AI implementation.",
        "Teaching": "3 years teaching undergraduate and graduate courses in computer science. Developed curriculum for AI and data science programs."
      };
      
      return `${d.id}: ${descriptions[d.id] || ""}`;
    });
  
  // Add smooth animation
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    
    // Keep nodes within bounds
    node.attr("transform", d => {
      d.x = Math.max(d.radius, Math.min(width - d.radius, d.x));
      d.y = Math.max(d.radius, Math.min(height - d.radius, d.y));
      return `translate(${d.x},${d.y})`;
    });
  });
  
  // Define drag behavior
  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
  
  // Add subtle animation for nodes
  d3.select(container).selectAll("circle")
    .each(function() {
      const circle = d3.select(this);
      const originalRadius = parseFloat(circle.attr("r"));
      
      function pulse() {
        circle.transition()
          .duration(1500)
          .attr("r", originalRadius * 1.05)
          .transition()
          .duration(1500)
          .attr("r", originalRadius)
          .on("end", pulse);
      }
      
      pulse();
    });
    
  // Add a subtle watermark-style title
  svg.append("text")
    .attr("x", 15)
    .attr("y", 25)
    .attr("font-size", "14px")
    .attr("font-weight", "500")
    .attr("fill", "#999999")
    .text("Career Network");
    
  return simulation;
}

// React component to use the D3 function
const CareerForceGraph = () => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (svgRef.current) {
      createCareerForceGraph(svgRef.current);
    }
  }, []);
  
  return (
    <div className="flex justify-center items-center w-full p-8">
      <svg 
        ref={svgRef} 
        className="w-full max-w-4xl h-auto shadow-md rounded-lg"
      />
    </div>
  );
};

export default CareerForceGraph;