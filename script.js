document.addEventListener('DOMContentLoaded', () => {
  
//   var swiper = new Swiper(".slide-content", {
//   slidesPerView: 3,
//   spaceBetween: 25,
//   loop: true,
//   centerSlide: 'true',
//   fade: 'true',
//   grabCursor: 'true',
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     dynamicBullets: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   breakpoints:{
//       0: {
//           slidesPerView: 1,
//       },
//       520: {
//           slidesPerView: 2,
//       },
//       950: {
//           slidesPerView: 3,
//       },
//   },
// });

    const menuToggle = document.querySelector('.toggle');
     const showcase = document.querySelector('.showcase');

     menuToggle.addEventListener('click', () => {
       menuToggle.classList.toggle('active');
       showcase.classList.toggle('active');
     })



 function videoslider(links){
           document.querySelector(".slider").src = links;
       }

//------------------------------------------------------------------------------------------------Draggble Carousal

 const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
   // showing and hiding prev/next icon according to carousel scroll left value
   let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
   arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
   arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
   icon.addEventListener("click", () => {
       let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
       // if clicked icon is left, reduce width value from the carousel scroll left else add to it
       carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
       setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
   });
});

const autoSlide = () => {
   // if there is no image left to scroll then return from here
   if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

   positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
   let firstImgWidth = firstImg.clientWidth + 14;
   // getting difference value that needs to add or reduce from carousel left to take middle img center
   let valDifference = firstImgWidth - positionDiff;

   if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
       return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
   }
   // if user is scrolling to the left
   carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
   // updatating global variables value on mouse down event
   isDragStart = true;
   prevPageX = e.pageX || e.touches[0].pageX;
   prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
   // scrolling images/carousel to left according to mouse pointer
   if(!isDragStart) return;
   e.preventDefault();
   isDragging = true;
   carousel.classList.add("dragging");
   positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
   carousel.scrollLeft = prevScrollLeft - positionDiff;
   showHideIcons();
}

const dragStop = () => {
   isDragStart = false;
   carousel.classList.remove("dragging");

   if(!isDragging) return;
   isDragging = false;
   autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);



// --------------------------------------------PHP connections for graph--------------------------------------------

function updateGraph1Data() {
  const url = 'conn1.php' + '?timestamp=' + Date.now();
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Process the data and update the chart for Graph 1
      const labels = data.dates; // Assuming dates are used as labels
      const datasets = [
        {
          label: 'X Data',
          data: data.x,
          borderColor: 'blue',
          fill: false
        },
        {
          label: 'Y Data',
          data: data.y,
          borderColor: 'red',
          fill: false
        },
        {
          label: 'Z Data',
          data: data.z,
          borderColor: 'green',
          fill: false
        }
      ];

      // Get the canvas element for Graph 1
      const ctxGraph1 = document.getElementById('lineGraph1').getContext('2d');

      // Check if the chart already exists, and if so, update the data
      if (window.multilineChart1) {
        window.multilineChart1.data.labels = labels;
        window.multilineChart1.data.datasets = datasets;
        window.multilineChart1.update();
      } else {
        // Create the chart for Graph 1
        window.multilineChart1 = new Chart(ctxGraph1, {
          type: 'line',
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Dates'
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Values'
                }
              }
            }
          }
        });
      }
    })
    .catch(error => {
      console.error('Error fetching data for Graph 1:', error);
    });
}

function updateGraph2Data() {
  const url = 'conn2.php' + '?timestamp=' + Date.now();
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Process the data and update the chart for Graph 2
      const labels = data.dates; // Assuming dates are used as labels
      const datasets = [
        {
          label: 'X Data',
          data: data.gx,
          borderColor: 'blue',
          fill: false
        },
        {
          label: 'Y Data',
          data: data.gy,
          borderColor: 'red',
          fill: false
        },
        {
          label: 'Z Data',
          data: data.gz,
          borderColor: 'green',
          fill: false
        }
      ];

      // Get the canvas element for Graph 2
      const ctxGraph2 = document.getElementById('lineGraph2').getContext('2d');

      // Check if the chart already exists, and if so, update the data
      if (window.multilineChart2) {
        window.multilineChart2.data.labels = labels;
        window.multilineChart2.data.datasets = datasets;
        window.multilineChart2.update();
      } else {
        // Create the chart for Graph 2
        window.multilineChart2 = new Chart(ctxGraph2, {
          type: 'line',
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Dates'
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Values'
                }
              }
            }
          }
        });
      }
    })
    .catch(error => {
      console.error('Error fetching data for Graph 2:', error);
    });
}


function updateGraph3Data() {
  const url = 'conn3.php' + '?timestamp=' + Date.now();
  fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);

            // Extract the data arrays
            const labels = data.dates; // Assuming dates are used as labels
            const datasets = [
                {
                    label: 'X Data',
                    data: data.x,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true
                },
                {
                    label: 'Y Data',
                    data: data.y,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true
                },
                {
                    label: 'Z Data',
                    data: data.z,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true
                }
            ];

            // Create the chart
            const ctxGraph3 = document.getElementById('lineGraph3').getContext('2d');

            if (window.multilineChart3) {
                window.multilineChart3.data.labels = labels;
                window.multilineChart3.data.datasets = datasets;
                window.multilineChart3.update();
            }
            else {
        // Create the chart for Graph 3
        window.multilineChart3 = new Chart(ctxGraph3, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Dates'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Values'
                            }
                        }
                    }
                }
            });
        }
    })
    .catch(error => {
      console.error('Error fetching data for Graph 3:', error);
    });
}

function updateGraph4Data() {
  const url = 'conn4.php' + '?timestamp=' + Date.now();
  fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);

            // Extract the data arrays
            const labels = data.dates; // Assuming dates are used as labels
            const datasets = [
                {
                    label: 'X Data',
                    data: data.gx,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true
                },
                {
                    label: 'Y Data',
                    data: data.gy,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true
                },
                {
                    label: 'Z Data',
                    data: data.gz,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true
                }
            ];

            // Create the chart
            const ctxGraph4= document.getElementById('lineGraph4').getContext('2d');

            // Check if the chart already exists, and if so, update the data
            if (window.multilineChart4) {
                window.multilineChart4.data.labels = labels;
                window.multilineChart4.data.datasets = datasets;
                window.multilineChart4.update();
            } else {
                // Create the chart for Graph 4
                window.multilineChart4 = new Chart(ctxGraph4, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Dates'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Values'
                            }
                        }
                    }
                }
            });
        }
    })
    .catch(error => {console.error('Error fetching data:', error);
});
}


function updateGraph5Data() {
  const url = 'conn5.php' + '?timestamp=' + Date.now();
  fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);

            // Extract the data arrays
            const labels = data.dates; // Assuming dates are used as labels
            const datasets = [
                {
                    label: 'maxtemperature',
                    data: data.maxtemp,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderWidth: 1
                },
                {
                    label: 'mintemperature',
                    data: data.mintemp,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderWidth: 1
                },
            ];

            // Create the chart
            const ctxGraph5 = document.getElementById('doubleBarGraph').getContext('2d');


            // Check if the chart already exists, and if so, update the data
            if (window.multilineChart5) {
                window.multilineChart5.data.labels = labels;
                window.multilineChart5.data.datasets = datasets;
                window.multilineChart5.update();
          } else {
            // Create the chart for Graph 5
                window.multilineChart5 = new Chart(ctxGraph5, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Dates'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Values'
                            }
                        }
                    }
                }
            });
        }
    })
    .catch(error => {
      console.error('Error fetching data for Graph 5:', error);
    });
}




        // Function to fetch and update data for both Graphs
        function updateData() {
            updateGraph1Data();
            updateGraph2Data();
            updateGraph3Data();
            updateGraph4Data();
            updateGraph5Data();
        }

        // Function to refresh the graph containers every 5 seconds
        function autoRefresh() {
            console.log('autoRefresh() function called.');
            updateData();
            setTimeout(autoRefresh, 5000); // 5000 milliseconds (5 seconds) interval
        }

        // Initial call to autoRefresh to start auto-refreshing the data
        autoRefresh();

});








 









// new Chart(pieChart, {
            //     type: 'pie',
            //     data: {
            //         labels: productProfitData.map(item => item.label),
            //         datasets: [
            //             {
            //                 data: productProfitData.map(item => item.data),
            //                 backgroundColor: productProfitData.map(item => item.backgroundColor)
            //             }
            //         ]
            //     },
            //     options: {
            //         responsive: true,
            //         maintainAspectRatio: false,
            //         plugins: {
            //             legend: {
            //                 display: true
            //             },
            //             title: {
            //                 display: true,
            //                 text: 'Pie Chart - Product Profit'
            //             }
            //         }
            //     }
            // });

                        // '#2085ec',
                        // '#72b4eb',
                        // '#0a417a',
                        // '#8464a0',
                        // '#cea9bc',
                        // '#323232',
                        // '#dec4ad',

