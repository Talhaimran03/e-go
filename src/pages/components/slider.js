import { select, arc } from 'd3';
import { useEffect, useRef } from 'react';

function Graph() {
  const contenitore = useRef(null);

  useEffect(() => {
    drawChart(45);
  }, []);

  function drawChart(value) {
    const height = 1450, width = 1860;
    const tau = Math.PI; // Cambiato da 2 * Math.PI a Math.PI per rendere visibile solo metà del grafico
    const maxValue = 100;
    const slice = value / maxValue;
    const innerRadius = 620, outerRadius = 700, startAngle = -Math.PI / 2, cornerRadius = 40; // Cambiato l'angolo di inizio
  
    // Rimuovi il vecchio SVG
    select(contenitore.current).selectAll('svg').remove();
  
    const svg = select(contenitore.current)
      .append('svg')
      .attr('height', '60%')
      .attr('width', '100%')
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", "translate(" + width / 2
      + "," + height / 2 + ")");
  
    // An arc will be created
    const arcGen = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngle)
      .cornerRadius(cornerRadius);
  
    const arc1 = svg.append("path")
      .datum({ endAngle: startAngle + tau }) // Cambiato da 2 * Math.PI a Math.PI per rendere visibile solo metà del grafico
      .style("fill", "#ddd")
      .attr("d", arcGen);
  
    const foreground = svg.append("path")
      .datum({ endAngle: startAngle + slice * tau }) // Cambiato da 2 * Math.PI a Math.PI per rendere visibile solo metà del grafico
      .attr('fill', '#4AA18B') // Cambiato il colore da #F57B21 a #4AA18B
      .attr("d", arcGen);
  }


  return (
    <div className='contenitore' >
      <div ref={contenitore} ></div>
    </div>
  );
}

export default Graph;
