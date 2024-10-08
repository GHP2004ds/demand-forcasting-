document.getElementById('applyFilters').addEventListener('click', () => {
    const csvFile = document.getElementById('csvFile').files[0];
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const chartType = document.getElementById('chartType').value;
  
    if (csvFile && startDate && endDate) {
      const formData = new FormData();
      formData.append('file', csvFile);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('chartType', chartType);
  
      fetch('http://localhost:5000/process-csv', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          // Call function to visualize data
          visualizeChart(data, chartType);
        })
        .catch(error => {
          console.error('Error processing CSV:', error);
        });
    } else {
      alert('Please upload a file and select a date range.');
    }
  });
  
  function visualizeChart(data, chartType) {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: data.labels, // Dates
        datasets: [{
          label: 'Sales Data',
          data: data.values,  // Sales values
          backgroundColor: chartType === 'pie' ? ['#f39c12', '#e74c3c', '#2ecc71', '#3498db'] : '#3498db',
          borderColor: '#2980b9',
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  