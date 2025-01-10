let testimonials = [
  {
    author: "Leo G",
    rating: 5,
    content: "Keren banget websitenya!",
    image:
      "http://localhost:2002/assets/img/wp12976537-obito-uchiha-pc-wallpapers.jpg",
  },
  {
    author: "Nur M Arofiq",
    rating: 4,
    content: "Mantaapp! Terima kasih.",
    image: "http://localhost:2002/assets/img/977157.png",
  },
  {
    author: "Rendy Zulfan",
    rating: 3,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea reiciendis qui molestias blanditiis inventore reprehenderit nesciunt sequi pariatur quaerat? Error?",
    image: "http://localhost:2002/assets/img/682210.jpg",
  },
  {
    author: "Syifa Maulaya",
    rating: 4,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, commodi obcaecati necessitatibus totam reprehenderit fuga.",
    image:
      "http://localhost:2002/assets/img/wp13729937-zelda-4k-desktop-wallpapers.jpg",
  },
  {
    author: "Budi santoso",
    rating: 2,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, commodi obcaecati necessitatibus totam reprehenderit fuga.",
    image:
      "http://localhost:2002/assets/img/YcmhfWs-l-wallpaper-death-note.jpg",
  },
  {
    author: "Rahmat nurmansyah",
    rating: 1,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, commodi obcaecati necessitatibus totam reprehenderit fuga.",
    image: "http://localhost:2002/assets/img/1003088.jpg",
  },
  {
    author: "Pandu Rizky",
    rating: 5,
    content: "Keren bener gannn",
    image: "http://localhost:2002/assets/img/617601.jpg",
  },
];

const testimonialsContainer = document.getElementById("testimonialsContainer");

const testimonialsHTML = (daftarTestimoni) => {
  return daftarTestimoni
    .map(
      (testimonial) => `
        <div class="card">
            <div class="img">
                <img src="${testimonial.image}" alt="">
            </div>
            <div class="comment">${testimonial.content}</div>
            <div class="author">
                <p class="a">${testimonial.author}</p>
                <p class="b">${testimonial.rating}✯</p>
            </div>
        </div>
        `
    )
    .join("");
};

function showAllTestimonials() {
  testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
}

showAllTestimonials();

function filterTestimonialByStar(rating) {
  const filteredTestimonial = testimonials.filter(
    (testimonial) => testimonial.rating === rating
  );

  console.log(filteredTestimonial);

  if (filteredTestimonial.length === 0) {
    return (testimonialsContainer.innerHTML = `<p>No testimonials.</p>`);
  }

  setTimeout(() => {
    testimonialsContainer.innerHTML = testimonialsHTML(filteredTestimonial);
  }, 1000);
}
