// Constants
const COMPACT_WIDTH = '96px';
const WIDE_WIDTH = '240px';
const SMALL_SCREEN_WIDTH = 590;

// Ensure the entire page is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set 'DOMContentLoaded' scope variables
  const body = document.querySelector('body');
  const menuButton = document.querySelector('.menu-icon');
  const sidebar = document.querySelector('.sidebar');
  const middleSection = document.querySelector('header.header div.middle-section');

  // Menu button actions on click
  menuButton.onclick = () => {
    // Actions for the screens with small width
    // Hide sidebar if it's compact
    if (window.innerWidth <= SMALL_SCREEN_WIDTH && body.style.paddingLeft === COMPACT_WIDTH) {
      sidebar.classList.replace('sidebar-compact', 'sidebar-hide');
      body.style.paddingLeft = '24px';
    }
    // Switch the sidebar on compact if i'st hidden.
    else if (window.innerWidth <= SMALL_SCREEN_WIDTH) {
      sidebar.classList.replace('sidebar-hide', 'sidebar-compact');
      body.style.paddingLeft = COMPACT_WIDTH;
    }
    // Switch the sidebar on compact if it's wide 
    else if (body.style.paddingLeft === WIDE_WIDTH) {
      body.style.paddingLeft = COMPACT_WIDTH;
      sidebar.classList.replace('sidebar-wide', 'sidebar-compact');
    }
    // Switch the sidebar on wide if it's compact
    else {
      body.style.paddingLeft = WIDE_WIDTH;
      sidebar.classList.replace('sidebar-compact', 'sidebar-wide');
    }
  }

  // Sidebar auto resize depending on viewport width
  function toggleSidebarStyle() {
    // Get viewport width
    const width = window.innerWidth;

    // Small screen width. Hide sidebar if it's compact
    if (width <= SMALL_SCREEN_WIDTH) {
      body.style.paddingLeft = '24px';
      sidebar.classList.replace('sidebar-compact', 'sidebar-hide');
      // Show middle section of the header
      middleSection.classList.replace('middle-section-show', 'middle-section-hide');

      // Switch the sidebar on wide if screen width is large
    } else if (width > 1315) {
      body.style.paddingLeft = WIDE_WIDTH;
      sidebar.classList.replace('sidebar-compact', 'sidebar-wide');

      // Switch the sidebar on compact from hidden/wide if screen width is average
    } else {
      body.style.paddingLeft = COMPACT_WIDTH;
      sidebar.classList.remove('sidebar-hide', 'sidebar-wide');
      sidebar.classList.add('sidebar-compact');
      // Show middle section of the header
      middleSection.classList.replace('middle-section-hide', 'middle-section-show');
    }
  }

  // Function to handle window resize event
  function handleResize() {
    let timeout;

    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        toggleSidebarStyle();
      }, 200);
    };
  }


  // Initial call to set sidebar style based on viewport width
  toggleSidebarStyle();

  // Add event listener for window resize
  window.addEventListener('resize', handleResize());

});