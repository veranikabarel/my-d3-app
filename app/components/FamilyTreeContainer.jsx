import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const FamilyTreeContainer = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (data) {
      // Create a tree layout
      const width = 2600;
      const height = 800;
      const tree = d3.tree().size([width, height]);

      // Create a hierarchy from your data
      const root = d3.hierarchy(data);

      // Set up the SVG container
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(50, 0)');

      // Create the tree layout
      tree(root);

      // Create links
      const links = svg.selectAll('.link')
        .data(root.descendants().slice(1))
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', (d) => {
          return `M${d.y},${d.x}C${(d.y + d.parent.y) / 2},${d.x} ${(d.y + d.parent.y) / 2},${d.parent.x} ${d.parent.y},${d.parent.x}`;
        });

      // Create nodes
      const nodes = svg.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      nodes.append('circle').attr('r', 5);
      nodes.append('text')
        .text((d) => d.data.name)
        .attr('dy', '0.31em');

      // Clean up
      return () => {
        svg.selectAll('*').remove();
      };
    }
  }, [data]);

  return <svg ref={svgRef} />;
};

export default FamilyTreeContainer;
