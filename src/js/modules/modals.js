const modals = () => {
  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true
  ) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    const windows = document.querySelectorAll("[data-modal]");
    const scroll = calcScroll();

    //my const
    const inputWidth = document.querySelector("#width");
    const inputHeight = document.querySelector("#height");
    const statusMessage = document.createElement("div");
    const calcWindow = document.querySelector(".popup_calc_content");
    const checkWindow = document.querySelector(".popup_calc_profile_content");
    const windowProfile = document.querySelectorAll(".checkbox");

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        function addInputError(window) {
          statusMessage.classList.add("status");
          window.appendChild(statusMessage);
          statusMessage.textContent = "Введите все данные";
        }

        function nextWindow() {
          windows.forEach((item) => {
            item.style.display = "none";
          });

          modal.style.display = "block";
          document.body.style.overflow = "hidden";
          document.body.style.marginRight = `${scroll}px`;
        }

        if (item.classList.contains("popup_calc_button")) {
          if (inputWidth.value !== "" && inputHeight.value !== "") {
            if (statusMessage.textContent !== "") {
              statusMessage.remove();
            }
            nextWindow();
            return;
          } else {
            addInputError(calcWindow);
            return;
          }
        }

        if (item.classList.contains("popup_calc_profile_button")) {
          if (statusMessage.textContent !== "") {
            statusMessage.remove();
          }
          let check = false;
          windowProfile.forEach((item, i) => {
            if (item.checked === true) {
              check = true;
            }
          });
          if (check) {
            nextWindow();
            return;
          } else {
            addInputError(checkWindow);
            return;
          }
        }

        nextWindow();
        //document.body.classList.add("modal-open");
      });
    });

    close.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });

      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
      //document.body.classList.remove("modal-open");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach((item) => {
          item.style.display = "none";
        });

        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
        //document.body.classList.remove("modal-open");
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      document.querySelector(selector).style.display = "block";
      document.body.style.overflow = "hidden";
    }, time);
  }

  function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }
  bindModal(
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );
  bindModal(".phone_link", ".popup", ".popup .popup_close");
  bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
  bindModal(
    ".popup_calc_button",
    ".popup_calc_profile",
    ".popup_calc_profile_close",
    false
  );
  bindModal(
    ".popup_calc_profile_button",
    ".popup_calc_end",
    ".popup_calc_end_close",
    false
  );
  showModalByTime(".popup-window", 60000);
};

export default modals;
