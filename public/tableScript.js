// Function to fetch and display resources
async function fetchResources() {
    try {
        // Fetch from the correct API endpoint
        const response = await fetch('/api/pantries');
        if (!response.ok) throw new Error('Network response was not ok');
        const resources = await response.json();
        
        const container = document.getElementById('resources-container');
        if (resources.length === 0) {
            container.innerHTML = '<p>No resources found.</p>';
        } else {
            container.innerHTML = '<table><tr><th> </th><th>Name</th><th>Address</th><th>Hours</th><th>Days</th></tr>' +
                resources.map(resource => `
                    <tr>
                        <td>${resource._id}</td>
                        <td>${resource.name}</td>
                        <td>${resource.address}</td>
                        <td>${resource.hours}</td>
                        <td>${resource.days}</td>
                    </tr>
                `).join('') +
                '</table>';
        }
    } catch (error) {
        document.getElementById('resources-container').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Call the function to fetch and display resources
fetchResources();
