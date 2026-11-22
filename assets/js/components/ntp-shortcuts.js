class NtpShortcuts extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    this.innerHTML = `<nav class="ntp-shortcuts" aria-label="Shortcuts">
  <a class="ntp-shortcut" href="#" aria-label="Office"><span class="ntp-shortcut-icon"><img src="../assets/images/windows/taskbar/office.svg" alt="" aria-hidden="true"></span><span class="ntp-shortcut-label">Office</span></a>
  <a class="ntp-shortcut" href="#" aria-label="Outlook"><span class="ntp-shortcut-icon"><img src="../assets/images/windows/taskbar/outlook-tile.svg" alt="" aria-hidden="true"></span><span class="ntp-shortcut-label">Outlook</span></a>
  <a class="ntp-shortcut" href="#" aria-label="SharePoint"><span class="ntp-shortcut-icon"><img src="../assets/images/windows/taskbar/sharepoint.svg" alt="" aria-hidden="true"></span><span class="ntp-shortcut-label">SharePoint</span></a>
  <a class="ntp-shortcut" href="#" aria-label="OneNote"><span class="ntp-shortcut-icon"><img src="../assets/images/windows/taskbar/onenote.svg" alt="" aria-hidden="true"></span><span class="ntp-shortcut-label">OneNote</span></a>
  <a class="ntp-shortcut" href="#" aria-label="OneDrive"><span class="ntp-shortcut-icon"><img src="../assets/images/windows/taskbar/onedrive.svg" alt="" aria-hidden="true"></span><span class="ntp-shortcut-label">OneDrive</span></a>
  <a class="ntp-shortcut" href="#" aria-label="PowerPoint"><span class="ntp-shortcut-icon"><img src="../assets/images/windows/taskbar/powerpoint.svg" alt="" aria-hidden="true"></span><span class="ntp-shortcut-label">PowerPoint</span></a>
  <a class="ntp-shortcut" href="#" aria-label="Excel"><span class="ntp-shortcut-icon"><img src="../assets/images/windows/taskbar/excel.svg" alt="" aria-hidden="true"></span><span class="ntp-shortcut-label">Excel</span></a>
  <a class="ntp-shortcut" href="#" aria-label="Word"><span class="ntp-shortcut-icon"><img src="../assets/images/windows/taskbar/word.svg" alt="" aria-hidden="true"></span><span class="ntp-shortcut-label">Word</span></a>
  <a class="ntp-shortcut" href="#" aria-label="Power BI"><span class="ntp-shortcut-icon"><img src="../assets/images/windows/taskbar/power-bi.svg" alt="" aria-hidden="true"></span><span class="ntp-shortcut-label">Power BI</span></a>
  <a class="ntp-shortcut ntp-shortcut--add" href="#" aria-label="Add shortcut"><span class="ntp-shortcut-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12 2C12.5523 2 13 2.44772 13 3V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H11V3C11 2.44772 11.4477 2 12 2Z" fill="currentColor"/></svg></span><span class="ntp-shortcut-label">Add</span></a>
</nav>`;
  }
}

customElements.define("ntp-shortcuts", NtpShortcuts);
