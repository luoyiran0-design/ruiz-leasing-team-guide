const searchInput = document.querySelector("#site-search");
const searchForm = document.querySelector(".search-shell");
const faqItems = Array.from(document.querySelectorAll(".faq-item"));
const filterButtons = Array.from(document.querySelectorAll(".filter"));
const emptyState = document.querySelector("#empty-state");
const chatPanel = document.querySelector("#chat-panel");
const scrim = document.querySelector(".scrim");
const chatLog = document.querySelector("#chat-log");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const emailGuide = document.querySelector("#find-agreement");
const replayEmailButton = document.querySelector("[data-replay-email]");
const rentGuide = document.querySelector("#rent");
const replayRentButton = document.querySelector("[data-replay-rent]");
const keysGuide = document.querySelector("#keys");
const replayKeysButton = document.querySelector("[data-replay-keys]");
const managerGuide = document.querySelector("#move-in-support");
const replayManagerButtons = document.querySelectorAll("[data-replay-manager]");
const utilityGuide = document.querySelector("#utilities");

let activeFilter = "all";

function normalize(value) {
  return value.trim().toLowerCase();
}

function updateFaq() {
  const query = normalize(searchInput.value);
  let visibleCount = 0;

  faqItems.forEach((item) => {
    const category = item.dataset.category || "";
    const keywords = item.dataset.keywords || "";
    const text = item.textContent || "";
    const matchesFilter = activeFilter === "all" || category.includes(activeFilter);
    const matchesQuery = !query || `${keywords} ${text}`.toLowerCase().includes(query);
    const isVisible = matchesFilter && matchesQuery;

    item.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount !== 0;
}

function setSearch(value) {
  searchInput.value = value;
  activeFilter = "all";
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === "all");
  });
  updateFaq();
  document.querySelector("#faq").scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function playEmailGuide() {
  if (!emailGuide) return;

  emailGuide.scrollIntoView({ behavior: "smooth", block: "start" });
  emailGuide.classList.remove("animate");

  window.setTimeout(() => {
    emailGuide.classList.add("animate");
  }, 260);
}

function playRentGuide() {
  if (!rentGuide) return;

  rentGuide.scrollIntoView({ behavior: "smooth", block: "start" });
  rentGuide.classList.remove("animate-rent");

  window.setTimeout(() => {
    rentGuide.classList.add("animate-rent");
  }, 260);
}

function playKeysGuide() {
  if (!keysGuide) return;

  keysGuide.scrollIntoView({ behavior: "smooth", block: "start" });
  keysGuide.classList.remove("animate-keys");

  window.setTimeout(() => {
    keysGuide.classList.add("animate-keys");
  }, 260);
}

function playManagerGuide() {
  if (!managerGuide) return;

  managerGuide.scrollIntoView({ behavior: "smooth", block: "start" });
  managerGuide.classList.remove("animate-manager");

  window.setTimeout(() => {
    managerGuide.classList.add("animate-manager");
  }, 260);
}

function playUtilityGuide() {
  if (!utilityGuide) return;

  utilityGuide.scrollIntoView({ behavior: "smooth", block: "start" });
  utilityGuide.classList.remove("animate-utility");

  window.setTimeout(() => {
    utilityGuide.classList.add("animate-utility");
  }, 260);
}

function routeQuery(value) {
  const query = normalize(value);
  if (!query) return false;

  const routes = [
    {
      terms: ["agreement", "contract", "lease", "sign", "signature", "initial", "email", "inbox", "spam", "junk"],
      action: playEmailGuide,
    },
    {
      terms: ["bond", "deposit", "reference", "receipt"],
      action: () => scrollToSection("#bond"),
    },
    {
      terms: ["sorted", "rent", "wallet", "profile", "payment method", "payment methods", "card", "bank", "automatic"],
      action: playRentGuide,
    },
    {
      terms: ["utility", "utilities", "electricity", "gas", "internet", "myconnect", "power"],
      action: playUtilityGuide,
    },
    {
      terms: ["key", "keys", "collection", "office", "marcus clarke", "address"],
      action: playKeysGuide,
    },
    {
      terms: ["property manager", "real estate agent", "maintenance", "repair", "after move", "after move-in", "handover"],
      action: playManagerGuide,
    },
  ];

  const match = routes.find((route) => route.terms.some((term) => query.includes(term)));
  if (!match) return false;

  searchInput.value = value;
  updateFaq();
  match.action();
  return true;
}

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const mark = item.querySelector(".chevron");

  question.addEventListener("click", () => {
    const isOpen = item.classList.toggle("open");
    mark.textContent = isOpen ? "-" : "+";
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.hasAttribute("data-jump-utility")) {
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      playUtilityGuide();
      return;
    }

    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateFaq();
  });
});

document.querySelectorAll("[data-query]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    if (button.hasAttribute("data-play-email")) {
      searchInput.value = button.dataset.query;
      updateFaq();
      playEmailGuide();
      return;
    }

    if (button.hasAttribute("data-play-rent")) {
      searchInput.value = button.dataset.query;
      updateFaq();
      playRentGuide();
      return;
    }

    if (button.hasAttribute("data-play-keys")) {
      searchInput.value = button.dataset.query;
      updateFaq();
      playKeysGuide();
      return;
    }

    if (button.hasAttribute("data-play-manager")) {
      searchInput.value = button.dataset.query;
      updateFaq();
      playManagerGuide();
      return;
    }

    if (button.hasAttribute("data-play-utility")) {
      searchInput.value = button.dataset.query;
      updateFaq();
      playUtilityGuide();
      return;
    }

    if (!routeQuery(button.dataset.query)) {
      setSearch(button.dataset.query);
    }
  });
});

replayEmailButton?.addEventListener("click", playEmailGuide);
replayRentButton?.addEventListener("click", playRentGuide);
replayKeysButton?.addEventListener("click", playKeysGuide);
replayManagerButtons.forEach((button) => {
  button.addEventListener("click", playManagerGuide);
});

searchInput.addEventListener("input", updateFaq);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!routeQuery(searchInput.value)) {
    updateFaq();
    document.querySelector("#faq").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

function openChat() {
  chatPanel.classList.add("open");
  scrim.classList.add("open");
  chatPanel.setAttribute("aria-hidden", "false");
  setTimeout(() => chatInput.focus(), 120);
}

function closeChat() {
  chatPanel.classList.remove("open");
  scrim.classList.remove("open");
  chatPanel.setAttribute("aria-hidden", "true");
}

function getDraftReply(question) {
  const text = normalize(question);

  if (text.includes("where") || text.includes("find") || text.includes("agreement email") || text.includes("contract") || text.includes("lease link") || text.includes("tenancy agreement")) {
    return "Your tenancy agreement is sent in the email titled \"Time to sign your tenancy agreement\". Search the inbox linked to your rental application and check spam, junk, promotions, and any secondary inboxes.";
  }

  if (text.includes("sign") || text.includes("signature") || text.includes("initial") || text.includes("complete")) {
    return "Open the signing link, review the tenancy agreement, and complete every required initial, checkbox, and signature field. If there are multiple tenants or guarantors, each person may need to sign from their own email link.";
  }

  if (text.includes("bond") || text.includes("deposit") || text.includes("pay") || text.includes("payment") || text.includes("fee") || text.includes("receipt")) {
    return "Bond payment details are included in the same email as your tenancy agreement. When making the payment, enter the correct payment reference number in the description field so your bond can be allocated correctly. Save your receipt or confirmation number.";
  }

  if (text.includes("confirm") || text.includes("confirmation") || text.includes("done") || text.includes("received")) {
    return "Your tenancy is confirmed when the tenancy agreement has been fully signed and your bond payment has been completed as instructed. Keep your signing confirmation and bond payment receipt for your records.";
  }

  if (text.includes("wrong email") || text.includes("resend") || text.includes("missing")) {
    return "If you cannot find the agreement email, contact the leasing team with your full name, unit number, phone number, and the email address used on your application. We can verify the file and resend the link if needed.";
  }

  if (text.includes("sorted") || text.includes("rent") || text.includes("wallet") || text.includes("bank account")) {
    return "To set up rent payments, download the Sorted app first. iPhone users can use the App Store link and Android users can use the Google Play link. Then open Account > Wallet > Payment methods and add your bank card. Your rent will be automatically charged on your move-in day.";
  }

  if (text.includes("utility") || text.includes("utilities") || text.includes("electricity") || text.includes("gas") || text.includes("internet") || text.includes("myconnect")) {
    return "Use the Utility Guide on this website to prepare electricity, gas, internet, and any building-specific requirements before move-in. Have your move-in date, property details, ID, and contact information ready before arranging connections.";
  }

  if (text.includes("key") || text.includes("keys") || text.includes("collection") || text.includes("office address")) {
    return "Keys must be collected in person from LEVEL 7/60 MARCUS CLARKE ST, CANBERRA ACT 2601 between 10:00a.m - 5:00p.m, Monday to Friday.";
  }

  if (text.includes("property manager") || text.includes("real estate agent") || text.includes("after move") || text.includes("after move-in") || text.includes("maintenance") || text.includes("repair") || text.includes("leasing team")) {
    return "After key collection and move-in, please contact your assigned Property Manager or real estate agent for property management, repairs, maintenance, access, and ongoing tenancy questions. The leasing team helps before move-in but does not manage the property after handover. Open your property in Sorted and check the Real estate agent section for the correct phone number and email address.";
  }

  return "I can help with the main post-agreement steps: where to find your tenancy agreement, how to sign it, how to pay your bond, how to set up rent payments in Sorted, key collection, and who to contact after move-in.";
}

function addMessage(message, type) {
  const bubble = document.createElement("p");
  bubble.className = type;
  bubble.textContent = message;
  chatLog.append(bubble);
  chatLog.scrollTop = chatLog.scrollHeight;
}

document.querySelectorAll("[data-open-chat]").forEach((button) => {
  button.addEventListener("click", openChat);
});

document.querySelectorAll("[data-close-chat]").forEach((button) => {
  button.addEventListener("click", closeChat);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;

  addMessage(question, "user");
  chatInput.value = "";
  setTimeout(() => addMessage(getDraftReply(question), "bot"), 180);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeChat();
});

updateFaq();
