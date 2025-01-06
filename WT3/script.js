function fetchDataWithPromises(apiUrl) {
    return new Promise((resolve, reject) => {
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
async function fetchDataWithAsyncAwait(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
function renderData(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
  
    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    `;
  
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
      `;
      tbody.appendChild(row);
    });
  
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }
  
  async function main() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users'; 
    const loadingDiv = document.getElementById('loading');
    const contentDiv = document.getElementById('content');
  
    try {
      const data = await fetchDataWithAsyncAwait(apiUrl);
      loadingDiv.style.display = 'none';
      const table = renderData(data);
      contentDiv.appendChild(table);
    } catch (error) {
      loadingDiv.textContent = 'Failed to load data.';
      console.error('Error:', error);
    }
  }
  main();
  