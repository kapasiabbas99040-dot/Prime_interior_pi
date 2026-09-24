        // Customer Inquiry Form Functions
			function toggleMenu() {
			document.getElementById("navLinks").classList.toggle("show");
		}

        function openInquiryForm() {
            document.getElementById('inquiryModal').classList.add('show');
            document.body.style.overflow = 'hidden';
            document.getElementById('customerInquiryForm').style.display = 'block';
            document.getElementById('successMessage').classList.remove('show');
        }

        function closeInquiryForm() {
            document.getElementById('inquiryModal').classList.remove('show');
        }

        // Close modal on outside click
    window.onclick = function(event) {
        const inquiryModal = document.getElementById('inquiryModal');
        if (event.target == inquiryModal) {
            closeInquiryForm();
        }
    }

    // Handle Inquiry Form Submission
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('customerInquiryForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation
            const name = document.getElementById('custName').value.trim();
            const email = document.getElementById('custEmail').value.trim();
            const mobile = document.getElementById('custMobile').value.trim();
            
            if (!name || !email || !mobile) {
                alert('Please fill all required fields (Name, Email, Mobile)');
                return;
            }
 
			//Work Galary
			function openImg(src) {
			  document.getElementById("popup").style.display = "flex";
			  document.getElementById("popupImg").src = src;
			}

			function closeImg() {
			  document.getElementById("popup").style.display = "none";
			}

            // Get all checked interests
            const interests = [];
            document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked').forEach(checkbox => {
                interests.push(checkbox.value);
            });
            
			//Dark Mode
			function toggleDark(){
  document.body.classList.toggle("dark");
}

            const formData = {
                name: name,
                email: email,
                mobile: mobile,
                city: document.getElementById('custCity').value,
                propertyType: document.getElementById('custPropertyType').value,
                interests: interests.length > 0 ? interests.join(', ') : 'Not specified',
                requirements: document.getElementById('custRequirements').value,
                date: new Date().toLocaleString()
            };
            

            // WhatsApp number
            const whatsappNumber = '919898077252';
            
            // Create WhatsApp message
            let message = `🏠 *New Inquiry - Prime Interior*\n\n`;
            message += `👤 *Name:* ${formData.name}\n`;
            message += `📧 *Email:* ${formData.email}\n`;
            message += `📱 *Mobile:* ${formData.mobile}\n`;
            if (formData.city) message += `🏙️ *City:* ${formData.city}\n`;
            if (formData.propertyType) message += `🏡 *Property Type:* ${formData.propertyType}\n`;
            message += `✨ *Interested In:* ${formData.interests}\n`;
            if (formData.requirements) message += `📝 *Requirements:* ${formData.requirements}\n`;
            message += `📅 *Date:* ${formData.date}`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Open WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            document.getElementById('customerInquiryForm').style.display = 'none';
            document.getElementById('successMessage').classList.add('show');
        });
    });