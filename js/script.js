async function getDates(){
	const response = await fetch('https://dpg.gg/test/calendar.json');
	const jsonData = await response.json();

	  function drawContributionGraph(data) {
      const graphContainer = document.getElementById("contribution-graph");
		
      
      for (let row = 0; row < 7; row++) {
        for (let column = 0; column < 51; column++) {
          const cell = document.createElement("div");
          cell.className = "contribution-cell";

          
          const date = getDateForCell(column, row);
          if (data[date] !== undefined) {
            const contributions = data[date];
            if (contributions === 0) {
              cell.classList.add("color-no-contributions");
            } else if (contributions < 10) {
              cell.classList.add("color-low-contributions");
            } else if (contributions < 20) {
              cell.classList.add("color-medium-contributions");
            } else if (contributions < 30) {
              cell.classList.add("color-high-contributions");
            } else {
              cell.classList.add("color-very-high-contributions");
            }

            
            const tooltip = document.createElement("div");
            tooltip.className = "tooltip";

            
            const formattedDate = formatDate(new Date(date));
            tooltip.innerHTML = `<span>${contributions} contributions</span><span class='gray'>${formattedDate}</span>`;
            cell.append(tooltip);

           
            cell.addEventListener("mouseenter", () => {
              tooltip.style.display = "flex";
            });

            cell.addEventListener("mouseleave", () => {
              tooltip.style.display = "none";
            });
          }

          graphContainer.append(cell);
        }
      }
    }

   
    function getDateForCell(column, row) {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() - 50 * 7); // Отсчет от текущей даты - 50 недель
      const date = new Date(endDate);
      date.setDate(date.getDate() + (column + row * 7));
      return date.toISOString().split("T")[0]; // Преобразование даты в формат "гггг-мм-дд"
    }

    
    function formatDate(date) {
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("ru-RU", options);
    }

    
    drawContributionGraph(jsonData);
}

getDates()