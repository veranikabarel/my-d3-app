import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import styles from './FamilyTree.module.css';

const FamilyTree = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current);
    const treeLayout = d3.tree().size([width, height]);

    // Create a hierarchy object
    const root = d3.hierarchy(data);

    // Generate the tree layout
    const treeData = treeLayout(root);

    // Create a group element for the tree and translate it to the desired position
    const links = svg.append('g').attr('transform', 'translate(50, 50)');

    // Create links (lines) for the tree
    links
      .selectAll('path.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', `${styles.link}`)
      .attr('d', (d) => {
        return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`;
      })
      .style('stroke', "steelblue");;

    // Create nodes (circles) for the tree
    const nodes = links
      .selectAll('g.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', `${styles.node}`)
      .attr('transform', (d) => `translate(${d.x},${d.y})`);

    nodes
      .append('text')
      .text((d) => d.data.name)
      .attr('dy', '0.35em');
  }, [data]);

  return <svg ref={svgRef} width={1300} height={1200}></svg>;
};

export default FamilyTree;
