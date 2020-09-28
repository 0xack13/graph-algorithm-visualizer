import React, { useContext } from "react";
import node from "../types/node";
import edge from "../types/edge";
import canvasProvider from "../types/canvasProvider";
import { AdjacencyListContext } from "../contexts/AdjacencyListContext";
import { CanvasContext } from "../contexts/CanvasContext";

type AppProps = { source: number; target: number; directed: boolean };

const Newedge = ({ source, target, directed }: AppProps) => {
  const { nodeList, addEdge } = useContext(AdjacencyListContext);
  const { canvas, context } = useContext<canvasProvider>(CanvasContext);
  const handleAddDirectedEdge = (event: React.MouseEvent) => {
    event.preventDefault();
    if (context && canvas) {
      let sourceNum: number = source;
      let targetNum: number = target;
      let sourceNode: node | null = null;
      let targetNode: node | null = null;
      for (let itr of nodeList) {
        if (itr.count === sourceNum) {
          sourceNode = itr;
        } else if (itr.count === targetNum) {
          targetNode = itr;
        }
      }
      if (sourceNode && targetNode) {
        const newEdge: edge = {
          source: sourceNode,
          target: targetNode,
          directed: true,
        };
        addEdge(newEdge);
      }
    }
  };

  const handleAddUndirectedEdge = (event: React.MouseEvent) => {
    event.preventDefault();
    if (context && canvas) {
      let sourceNum: number = +source;
      let targetNum: number = +target;
      let sourceNode: node | null = null;
      let targetNode: node | null = null;
      for (let itr of nodeList) {
        if (itr.count === sourceNum) {
          sourceNode = itr;
        } else if (itr.count === targetNum) {
          targetNode = itr;
        }
      }
      if (sourceNode && targetNode) {
        const newEdge: edge = {
          source: sourceNode,
          target: targetNode,
          directed: false,
        };
        addEdge(newEdge);
      }
    }
  };

  return (
    <div
      key={target}
      onClick={directed ? handleAddDirectedEdge : handleAddUndirectedEdge}
      className="context-menu-option"
    >
      {target}
    </div>
  );
};

export default Newedge;