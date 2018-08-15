import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as d3 from 'd3';
import * as d3Hierarchy from 'd3-hierarchy';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
    selector: 'app-visuals-treemap-chart',
    templateUrl: './treemap-chart.component.html',
    styleUrls: ['./treemap-chart.component.css']
})
export class appVisualTreemapChartComponent implements OnInit {
    @Input() data: Array<any> = [];
    options: Object;
    bytes: number;
    fromdateValue: Date;
    todateValue: Date;
    constructor() {
        
    }

    ngOnInit() {
        console.log("treemap data",this.data);
        //var data = d3.nest().key(function(d) { return d.region; }).key(function(d) { return d.subregion; }).entries(this.data);
        this.main();
        
    }

    main() {
        var data = {
            "name": 'Total Site Consumption',
            "shortName": 'Total Site Consumption',
            "children": [
              {
                "name": "6.1 Identify and plan learning needs",
                "shortName": "Block 1",
                "size": null,
                "children": [
                  {
                    "name": "Flat 101",
                    "shortName": "Flat 101",
                    "size": 50,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Demonstrate an  of the role of the",
                    "shortName": "Flat 102",
                    "size": 100,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Use  knowledge of the Standards for ",
                    "shortName": "Flat 103",
                    "size": 150,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Use the  plan learning needs.",
                    "shortName": "Flat 104",
                    "size": 200,
                    "children": [
                      
                    ]
                  }
                ]
              },
              {
                "name": "6.2 Engage in improve practice",
                "shortName": "Block 2",
                "size": null,
                "children": [
                  {
                    "name": "Participate in to update knowledge .",
                    "shortName": "Flat 201",
                    "size": 100,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Understand appropriate sources of .",
                    "shortName": "Flat 202",
                    "size": 200,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Plan for  and critiquing ",
                    "shortName": "Flat 203",
                    "size": 300,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Initiate to expand opportunities.",
                    "shortName": "Flat 204",
                    "size": 400,
                    "children": [
                      
                    ]
                  }
                ]
              },
              {
                "name": "6.3 Engage with  and improve practice",
                "shortName": "Block 3",
                "size": null,
                "children": [
                  {
                    "name": "Contribute to collegial  and apply.",
                    "shortName": "Flat 301",
                    "size": 150,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Initiate and engage in  discussions.",
                    "shortName": "Flat 302",
                    "size": 300,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Seek and feedback from .",
                    "shortName": "Flat 303",
                    "size": 450,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Implement  dialogue within   by .",
                    "shortName": "Flat 304",
                    "size": 600,
                    "children": [
                      
                    ]
                  }
                ]
              },
              {
                "name": "6.4 Apply  improve learning",
                "shortName": "Block 4",
                "size": null,
                "children": [
                  {
                    "name": "Undertake  .",
                    "shortName": "Flat 401",
                    "size": 350,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Demonstrate an  of the rationale.",
                    "shortName": "Flat 402",
                    "size": 700,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Engage with  to evaluate the .",
                    "shortName": "Flat 403",
                    "size": 1050,
                    "children": [
                      
                    ]
                  },
                  {
                    "name": "Advocate,  in and lead high-quality .",
                    "shortName": "Flat 404",
                    "size": 1500,
                    "children": [
                      
                    ]
                  }
                ]
              }
            ]
          };
          
          //https://bl.ocks.org/JacquesJahnichen/42afd0cde7cbf72ecb81
          //https://bl.ocks.org/ganeshv/6a8e9ada3ab7f2d88022
          //https://gist.github.com/tkafka/6d00c44d5ae52182f548a18e8db44811
          var margin = {top: 20, right: 0, bottom: 0, left: 0},
          width = 950, //640
          height = 530,
          formatNumber = d3.format(",d"),
          transitioning;
          
          var x = d3.scaleLinear()
          .domain([0, width])
          .range([0, width]);
          
          var y = d3.scaleLinear()
          .domain([0, height - margin.top - margin.bottom])
          .range([0, height - margin.top - margin.bottom]);
          
          
          var color = d3.scaleOrdinal()
          .range(d3.schemeCategory10
              .map(function(c) { c = d3.rgb(c); c.opacity = 1; return c; }));
          
          //var color = d3.scaleOrdinal(d3.schemeCategory20.map(fader));
          
          var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); };
          
          var format = d3.format(",d");
          
          var treemap;
          
          var svg, grandparent;
          
          updateDrillDown();
          
          function updateDrillDown() {
              
              if (svg) {
                  svg.selectAll("*").remove();
              } else {
          
                  
                  
          //		 var treemap = d3.layout.treemap()
          //	      .children(function(d, depth) { return depth ? null : d._children; })
          //	      .sort(function(a, b) { return a.value - b.value; })
          //	      .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
          //	      .round(false);
                
                svg = d3.select("#domainDrillDown").append("svg")
                    .attr("width", width - margin.left - margin.right)
                    .attr("height", height - margin.bottom - margin.top)
                    .style("margin-left", -margin.left + "px")
                    .style("margin.right", -margin.right + "px")
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .style("shape-rendering", "crispEdges");		
                  
                  
                   
                    grandparent = svg.append("g")
                        .attr("class", "grandparent");
                    
                    grandparent.append("rect")
                        .attr("y", -margin.top)
                        .attr("width", width)
                        .attr("height", margin.top);
                    
                    grandparent.append("text")
                        .attr("x", 6)
                        .attr("y", 6 - margin.top)
                        .attr("dy", ".75em");		 
                   
                   treemap = d3.treemap()
                      //.tile(d3.treemapResquarify)
                      .size([width, height])
                      .round(false)
                      .paddingInner(1);
              }
                            
                    var root = d3.hierarchy(data)
                        .eachBefore(function(d) { d.id = (d.parent ? d.parent.id + "." : "") + d.data.shortName; })
                        .sum((d) => d.size)
                        .sort(function(a, b) {
                        console.log('initial root sort a ' + a.value + ' b ' + b.value);
                          return b.height - a.height || b.value - a.value; });
                    
                    initialize(root);
                    accumulate(root);
                    layout(root);
                    treemap(root);
                    display(root);
          
          };
          
          
          
          function initialize(root) {
              root.x = root.y = 0;
              root.x1 = width;
              root.y1 = height;
              root.depth = 0;
            }
          
            // Aggregate the values for internal nodes. This is normally done by the
            // treemap layout, but not here because of our custom implementation.
            // We also take a snapshot of the original children (_children) to avoid
            // the children being overwritten when when layout is computed.
            function accumulate(d) {
                console.log('accumulate called ' + d.data.name);
              return (d._children = d.children)
                  ? d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
                  : d.value;
            }
          
          
          
          // Compute the treemap layout recursively such that each group of siblings
          // uses the same size (1×1) rather than the dimensions of the parent cell.
          // This optimizes the layout for the current zoom state. Note that a wrapper
          // object is created for the parent node for each group of siblings so that
          // the parent’s dimensions are not discarded as we recurse. Since each group
          // of sibling was laid out in 1×1, we must rescale to fit using absolute
          // coordinates. This lets us use a viewport to zoom.
          function layout(d) {
            if (d._children) {
          //    treemap.nodes({_children: d._children});
          //	  treemap(d);
              d._children.forEach(function(c) {
                c.x0 = d.x0 + c.x0 * d.x1;
                c.y0 = d.y0 + c.y0 * d.y1;
                c.x1 *= d.x1;
                c.y1 *= d.y1;
                c.parent = d;
                layout(c);
              });
            }
          }
          
          
          
          function display(d) {
              
            grandparent
                .datum(d.parent)
                .on("click", transition)
              .select("text")
                .text(name(d));
          
            var g1 = svg.insert("g", ".grandparent")
                .datum(d)
                .attr("class", "depth");
            
            var g = g1.selectAll("g")
                .data(d._children)
              .enter().append("g");
          console.log()
            g.filter(function(d) { return d._children; })
                .classed("children", true)
                .on("click", transition);
          
            var children = g.selectAll(".child")
                .data(function(d) { return d._children || [d]; })
              .enter().append("g");
          
            children.append("rect")
                .attr("class", "child")
                .call(rect)
              .append("title")
                .text(function(d) { return d.data.shortName + " (" + formatNumber(d.value) + " K/l)"; });
          
            children.append("text")
                .attr("class", "ctext")
                .text(function(d) { return d.data.shortName; })
                .call(text2);
          
            g.append("rect")
                .attr("class", "parent")
                .call(rect);
          
            
              var t = g.append("text")
                .attr("class", "ptext")
                .attr("font-size","1em")
                .attr("dy", ".75em")
              
              t.append("tspan")
                .text(function(d) { return d.data.shortName +' ('+ formatNumber(d.value)+' K/l)'});
              // t.append("tspan")
              //   .attr("dy", "1.0em")
              //   .attr("font-size","1em")
              //   .text(function(d) { return formatNumber(d.value); });
              t.call(text);
              
              g.selectAll("rect")
                .style("fill", function(d) { return color(d.data.shortName); });
              
              
          
            function transition(d) {
              if (transitioning || !d) return;
              transitioning = true;
          
              var g2 = display(d),
                  t1 = g1.transition().duration(750),
                  t2 = g2.transition().duration(750);
          
              
              
              
              // Update the domain only after entering new elements.
              x.domain([d.x0, d.x0 + d.x1]);
              y.domain([d.y0, d.y0 + d.y1]);
          
              // Enable anti-aliasing during the transition.
              svg.style("shape-rendering", null);
          
              // Draw child nodes on top of parent nodes.
              svg.selectAll(".depth").sort(function(a, b) { 
                  console.log('.depth sort a ' + a.depth + ' b ' + b.depth);
                  return a.depth - b.depth; });
          
              // Fade-in entering text.
              g2.selectAll("text").style("fill-opacity", 0);
          
              // Transition to the new view.
              t1.selectAll("text").call(text).style("fill-opacity", 0);
              t2.selectAll("text").call(text).style("fill-opacity", 1);
              t1.selectAll("rect").call(rect);
              t2.selectAll("rect").call(rect);
          
              // Remove the old node when the transition is finished.
              t1.remove().on("end", function() {
                svg.style("shape-rendering", "crispEdges");
                transitioning = false;
              });
            }
          
            return g;
          }
          
          function text(text) {
              text.selectAll("tspan")
                  .attr("x", function(d) { return x(d.x0) + 6; })
              text.attr("x", function(d) { return x(d.x0) + 6; })
                  .attr("y", function(d) { return y(d.y0) + 10; })
                  .style("opacity", function(d) {
                      console.log("text opacity setting textlength " + this.getComputedTextLength() + " d size " + (x(d.x0 + d.x1) - x(d.x0)));
                      return this.getComputedTextLength() < x(d.x0 + d.x1) - x(d.x0) ? 1 : 0; 
                  });
            }
          
            function text2(text) {
              text.attr("x", function(d) { return x(d.x0 + d.x1) - this.getComputedTextLength() - 6; })
                  .attr("y", function(d) { return y(d.y0 + d.y1) - 6; })
                  .style("opacity", function(d) { return this.getComputedTextLength() < x(d.x0 + d.x1) - x(d.x0) ? 1 : 0; });
            }
          
            function rect(rect) {
              rect.attr("x", function(d) { return x(d.x0); })
                  .attr("y", function(d) { return y(d.y0); })
                  .attr("width", function(d) {
                      console.log('id ' + d.id+' rect width ' + (d.x1 - d.x0));
                      return x(d.x0 + d.x1) - x(d.x0); 
                      //return (d.x1 -d.x0);
                
                      })
                  .attr("height", function(d) { 
                      console.log('id ' + d.id+' rect height ' + (d.y1 - d.y0) + ' ordinal ' + (y(d.y1 +d.y0)  - y(d.y0)));
                      return y(d.y0 + d.y1) - y(d.y0);
                      //return y(d.y1 - d.y0);
                
                      });
            }
          
            function name(d) {
              return d.parent
                  ? name(d.parent) + " / " + d.data.shortName + " (" + formatNumber(d.value) + ")"
                  : d.data.shortName + " (" + formatNumber(d.value) + ")";
            }
    }

    
}
