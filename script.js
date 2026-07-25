document.querySelectorAll('.proj-card').forEach((card) => {
    const link = card.querySelector('.trailer-link');
    const thumb = card.querySelector('.proj-thumb');
    if(!link || !thumb) return;

    const match = link.href.match(/[?&]v=([^&]+)/) || link.href.match(/youtu\.be\/([^?&]+)/);
    if(!match) return;
    const videoId = match[1];

    // frame: "0" = default thumbnail, "1"/"2"/"3" = YouTube's other auto-generated frames
    // (roughly early / middle / late in the video) — closest free option to a chosen timestamp.
    // Set data-yt-frame="1", "2", or "3" on the .proj-thumb element in index.html to pick one.
    const frame = thumb.dataset.ytFrame || '0';
    const imageUrl = frame === '0'
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : `https://img.youtube.com/vi/${videoId}/${frame}.jpg`;

    thumb.style.backgroundImage = `url('${imageUrl}')`;
  });

const contactForm = document.getElementById('contactForm');
  const cfSubmit = document.getElementById('cfSubmit');
  const cfStatus = document.getElementById('cfStatus');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    cfSubmit.disabled = true;
    cfSubmit.textContent = 'Sending...';
    cfStatus.textContent = '';
    cfStatus.className = 'form-status';

    const formData = new FormData(contactForm);

    try{
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      const result = await response.json();

      if(result.success){
        cfStatus.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
        cfStatus.classList.add('success');
        contactForm.reset();
      } else {
        cfStatus.textContent = 'Something went wrong. Please email me directly instead.';
        cfStatus.classList.add('error');
      }
    } catch(err){
      cfStatus.textContent = 'Network error — please email me directly instead.';
      cfStatus.classList.add('error');
    } finally {
      cfSubmit.disabled = false;
      cfSubmit.textContent = 'Send Message';
    }
  });

const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 480){ scrollBtn.classList.add('show'); }
    else{ scrollBtn.classList.remove('show'); }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });
