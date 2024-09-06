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
            container.innerHTML = '<table><tr><th>Name</th><th>Type</th><th>Availability</th><th>Location</th></tr>' +
                resources.map(resource => `
                    <tr>
                        <td>${resource.name}</td>
                        <td>${resource.type}</td>
                        <td>${resource.availability}</td>
                        <td>${resource.location}</td>
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
