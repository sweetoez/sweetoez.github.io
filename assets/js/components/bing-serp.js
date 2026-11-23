(function () {
  const search20Icon = '<svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7291 14.4362C12.5924 15.411 11.115 16 9.5 16C5.91015 16 3 13.0899 3 9.5C3 5.91015 5.91015 3 9.5 3C13.0899 3 16 5.91015 16 9.5C16 11.115 15.411 12.5924 14.4361 13.7292L17.8535 17.1465C18.0487 17.3417 18.0487 17.6583 17.8535 17.8536C17.6799 18.0271 17.4105 18.0464 17.2156 17.9114L17.1464 17.8536L13.7291 14.4362ZM13.0196 13.7266C13.276 13.5128 13.5127 13.2761 13.7265 13.0197C14.5216 12.0659 15 10.8388 15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15C10.8388 15 12.0658 14.5217 13.0196 13.7266Z" fill="currentColor"/></svg>';
  const search16Icon = '<svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0195 11.7266C10.0658 12.5217 8.83875 13 7.5 13C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5C13 8.83875 12.5217 10.0658 11.7266 11.0195L14.8535 14.1464C15.0488 14.3417 15.0488 14.6583 14.8535 14.8536C14.6583 15.0488 14.3417 15.0488 14.1464 14.8536L11.0195 11.7266ZM12 7.5C12 5.01472 9.98528 3 7.5 3C5.01472 3 3 5.01472 3 7.5C3 9.98528 5.01472 12 7.5 12C9.98528 12 12 9.98528 12 7.5Z" fill="currentColor"/></svg>';
  const chevronRightIcon = '<svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z" fill="currentColor"/></svg>';
  const chevronDownIcon = '<svg aria-hidden="true" focusable="false" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z" fill="currentColor"/></svg>';
  function inlineIcon(size, path) {
    return `<svg aria-hidden="true" focusable="false" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${path}" fill="currentColor"/></svg>`;
  }
  const mic20Icon = inlineIcon(20, "M10 13C11.6569 13 13 11.6568 13 9.99998V5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5V9.99998C7 11.6568 8.34315 13 10 13ZM10 12C8.89543 12 8 11.1046 8 9.99998V5C8 3.89543 8.89543 3 10 3C11.1046 3 12 3.89543 12 5V9.99998C12 11.1046 11.1046 12 10 12ZM5 9.49998C5.27614 9.49998 5.5 9.72384 5.5 9.99998C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 9.99998C14.5 9.72384 14.7239 9.49998 15 9.49998C15.2761 9.49998 15.5 9.72384 15.5 9.99998C15.5 12.869 13.3033 15.2249 10.5 15.4776V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V15.4776C6.69675 15.2249 4.5 12.869 4.5 9.99998C4.5 9.72384 4.72386 9.49998 5 9.49998Z");
  const imageSearch20Icon = inlineIcon(20, "M6 3C4.34315 3 3 4.34315 3 6V8.75777C3.30851 8.55127 3.64397 8.3819 4 8.25606V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V14C16 14.3726 15.8981 14.7215 15.7206 15.0201L11.0513 10.432C10.586 9.97478 9.8969 9.88214 9.3409 10.1541C9.51414 10.4371 9.65697 10.7408 9.76486 11.0606C9.95273 10.9604 10.191 10.9886 10.3504 11.1453L15.0118 15.7256C14.7149 15.9 14.3692 16 14 16H11.1213L11.5607 16.4393C11.7244 16.6031 11.8424 16.7953 11.9146 17H14C15.6569 17 17 15.6569 17 14V6C17 4.34315 15.6569 3 14 3H6ZM12.5 9C13.3284 9 14 8.32843 14 7.5C14 6.67157 13.3284 6 12.5 6C11.6716 6 11 6.67157 11 7.5C11 8.32843 11.6716 9 12.5 9ZM12.5 8C12.2239 8 12 7.77614 12 7.5C12 7.22386 12.2239 7 12.5 7C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8ZM8.30319 14.5961C8.7408 14.0118 9 13.2862 9 12.5C9 10.567 7.433 9 5.5 9C3.567 9 2 10.567 2 12.5C2 14.433 3.567 16 5.5 16C6.28617 16 7.0118 15.7408 7.59609 15.3032L10.1464 17.8536C10.3417 18.0488 10.6583 18.0488 10.8536 17.8536C11.0488 17.6583 11.0488 17.3417 10.8536 17.1464L8.30319 14.5961ZM5.5 15C4.11929 15 3 13.8807 3 12.5C3 11.1193 4.11929 10 5.5 10C6.88071 10 8 11.1193 8 12.5C8 13.8807 6.88071 15 5.5 15Z");
  const chatSparkle16Icon = inlineIcon(16, "M7.99992 1C8.26394 1 8.52474 1.01547 8.78117 1.04395C8.72104 1.22336 8.6217 1.383 8.4921 1.5127C8.36201 1.64287 8.20201 1.75362 8.04191 1.80371L7.29874 2.04199C4.31558 2.3894 1.99992 4.92361 1.99992 8C1.99992 9.18014 2.34138 10.2791 2.9296 11.207C3.01002 11.3339 3.0298 11.4903 2.98234 11.6328L2.28996 13.708L4.36613 13.0166C4.516 12.9842 4.65576 12.983 4.79191 13.0693C5.72008 13.658 6.81944 14 7.99992 14C9.90609 14 11.603 13.1095 12.7021 11.7236C12.7203 11.7383 12.7366 11.7556 12.7558 11.7695C12.9746 11.9188 13.2335 11.998 13.5019 11.999C13.5891 11.9988 13.6747 11.9903 13.7587 11.9775C12.4954 13.803 10.388 15 7.99992 15C6.70917 15 5.49992 14.6487 4.46183 14.0391L1.65812 14.9746C1.47855 15.0344 1.28028 14.9873 1.1464 14.8535C1.0126 14.7196 0.965507 14.5214 1.02531 14.3418L1.9589 11.5361C1.35005 10.4984 0.999916 9.28978 0.999916 8C0.999916 4.13407 4.13401 1.00011 7.99992 1ZM13.497 12H13.5068L13.5019 11.999L13.497 12ZM13.4843 6C13.5468 6 13.6081 6.01962 13.6591 6.05566C13.71 6.09166 13.7486 6.14245 13.7694 6.20117L14.0185 6.9668C14.0958 7.19923 14.227 7.41077 14.4003 7.58398C14.5736 7.75707 14.7849 7.8876 15.0175 7.96484L15.7831 8.21289L15.7987 8.2168C15.8575 8.23758 15.9082 8.27636 15.9443 8.32715C15.9804 8.37818 15.9999 8.43944 15.9999 8.50195C15.9999 8.56445 15.9804 8.62574 15.9443 8.67676C15.9082 8.72753 15.8575 8.76634 15.7987 8.78711L15.0331 9.03516C14.8004 9.11245 14.5884 9.24277 14.415 9.41602C14.2416 9.5892 14.1115 9.80081 14.0341 10.0332L13.7851 10.7988C13.7642 10.8576 13.7256 10.9083 13.6747 10.9443C13.6237 10.9804 13.5625 11 13.4999 11C13.4374 11 13.3761 10.9804 13.3251 10.9443C13.2743 10.9083 13.2356 10.8575 13.2148 10.7988L12.9657 10.0332C12.8889 9.80016 12.7592 9.58791 12.5859 9.41406C12.4125 9.24016 12.2007 9.10894 11.9677 9.03125L11.2021 8.7832C11.1431 8.76243 11.0917 8.72381 11.0556 8.67285C11.0194 8.62182 10.9999 8.56056 10.9999 8.49805C10.9999 8.43555 11.0195 8.37426 11.0556 8.32324C11.0917 8.27232 11.1431 8.23366 11.2021 8.21289L11.9677 7.96484C12.1974 7.88555 12.4056 7.75404 12.5761 7.58105C12.7467 7.40796 12.8753 7.1976 12.9511 6.9668L13.2001 6.20117C13.221 6.14245 13.2596 6.09166 13.3105 6.05566C13.3614 6.01972 13.422 6.0001 13.4843 6ZM10.4784 0C10.566 0 10.6521 0.0275726 10.7235 0.078125C10.7948 0.128655 10.8488 0.199881 10.8778 0.282227L11.2265 1.35352C11.3348 1.67874 11.5172 1.97439 11.7597 2.2168C12.0024 2.45938 12.2991 2.64178 12.6249 2.75L13.6962 3.09863L13.7177 3.10352C13.8003 3.13263 13.8722 3.18735 13.9228 3.25879C13.9731 3.33013 13.9999 3.41562 13.9999 3.50293C13.9999 3.59029 13.9732 3.67573 13.9228 3.74707C13.8722 3.81847 13.8002 3.87224 13.7177 3.90137L12.6464 4.25C12.3206 4.35822 12.0239 4.54062 11.7812 4.7832C11.5386 5.02561 11.3563 5.32125 11.248 5.64648L10.8993 6.71777C10.8703 6.80011 10.8163 6.87134 10.745 6.92188C10.6735 6.97243 10.5875 7 10.4999 7C10.4124 6.99997 10.3272 6.9724 10.2558 6.92188C10.2489 6.91701 10.2418 6.91247 10.2353 6.90723C10.174 6.85803 10.1268 6.79217 10.1005 6.71777L9.75285 5.64648C9.73416 5.5898 9.7125 5.53427 9.68937 5.47949C9.57936 5.21893 9.42016 4.98143 9.21964 4.78027C9.18154 4.74205 9.14213 4.70513 9.10148 4.66992C8.88316 4.48088 8.62944 4.33582 8.35441 4.24414L7.28214 3.89648C7.19966 3.86735 7.12858 3.81257 7.07804 3.74121C7.02754 3.66981 6.99992 3.58451 6.99992 3.49707C6.99997 3.40964 7.0275 3.3243 7.07804 3.25293C7.12854 3.18168 7.19978 3.12776 7.28214 3.09863L8.35441 2.75C8.67609 2.63895 8.96815 2.45522 9.20695 2.21289C9.44562 1.97061 9.62524 1.67652 9.73136 1.35352L10.079 0.282227C10.1081 0.199733 10.1628 0.128673 10.2343 0.078125C10.3057 0.0276133 10.3909 4.3712e-05 10.4784 0Z");
  const image16Icon = inlineIcon(16, "M11.5 5.50207C11.5 6.0555 11.0514 6.50414 10.4979 6.50414C9.94449 6.50414 9.49585 6.0555 9.49585 5.50207C9.49585 4.94864 9.94449 4.5 10.4979 4.5C11.0514 4.5 11.5 4.94864 11.5 5.50207ZM2 4.5C2 3.11929 3.11929 2 4.5 2H11.5C12.8807 2 14 3.11929 14 4.5V11.5C14 12.8807 12.8807 14 11.5 14H4.5C3.11929 14 2 12.8807 2 11.5V4.5ZM4.5 3C3.67157 3 3 3.67157 3 4.5V11.5C3 11.7316 3.05248 11.9509 3.1462 12.1467L6.79796 8.49499C7.46185 7.8311 8.53823 7.8311 9.20212 8.49499L12.8538 12.1467C12.9475 11.9509 13 11.7316 13 11.5V4.5C13 3.67157 12.3284 3 11.5 3H4.5ZM12.1467 12.8538L8.49501 9.2021C8.22164 8.92873 7.77843 8.92873 7.50506 9.2021L3.85333 12.8538C4.04914 12.9475 4.26844 13 4.5 13H11.5C11.7316 13 11.9509 12.9475 12.1467 12.8538Z");
  const video16Icon = inlineIcon(16, "M3.5 3C2.11929 3 1 4.11929 1 5.5V10.5C1 11.8807 2.11929 13 3.5 13H8.5C9.88071 13 11 11.8807 11 10.5V10.3728L13.0354 11.7782C13.8646 12.3507 14.9957 11.7572 14.9957 10.7496V5.25216C14.9957 4.24453 13.8646 3.65101 13.0354 4.22353L11 5.62896V5.5C11 4.11929 9.88071 3 8.5 3H3.5ZM11 6.84418L13.6036 5.04643C13.7695 4.93193 13.9957 5.05063 13.9957 5.25216V10.7496C13.9957 10.9511 13.7695 11.0698 13.6036 10.9553L11 9.15757V6.84418ZM2 5.5C2 4.67157 2.67157 4 3.5 4H8.5C9.32843 4 10 4.67157 10 5.5V10.5C10 11.3284 9.32843 12 8.5 12H3.5C2.67157 12 2 11.3284 2 10.5V5.5Z");
  const map16Icon = inlineIcon(16, "M5.235 2.076C5.38271 1.98368 5.56781 1.97489 5.72361 2.05279L10.4728 4.42738L14.235 2.076C14.3891 1.97967 14.5834 1.97457 14.7424 2.06268C14.9014 2.15079 15 2.31824 15 2.5V11C15 11.1724 14.9112 11.3326 14.765 11.424L10.765 13.924C10.6173 14.0163 10.4322 14.0251 10.2764 13.9472L5.52721 11.5726L1.765 13.924C1.61087 14.0203 1.41659 14.0254 1.25762 13.9373C1.09864 13.8492 1 13.6818 1 13.5V5C1 4.82761 1.08881 4.66737 1.235 4.576L5.235 2.076ZM6 10.691L10 12.691V5.30902L6 3.30902V10.691ZM5 3.40212L2 5.27712V12.5979L5 10.7229V3.40212ZM11 5.27712V12.5979L14 10.7229V3.40212L11 5.27712Z");
  const news16Icon = inlineIcon(16, "M3.5 5C3.22386 5 3 5.22386 3 5.5C3 5.77614 3.22386 6 3.5 6H10.5C10.7761 6 11 5.77614 11 5.5C11 5.22386 10.7761 5 10.5 5H3.5ZM3.5 7C3.22386 7 3 7.22386 3 7.5V9.5C3 9.77614 3.22386 10 3.5 10H5.5C5.77614 10 6 9.77614 6 9.5V7.5C6 7.22386 5.77614 7 5.5 7H3.5ZM4 9V8H5V9H4ZM7.5 7C7.22386 7 7 7.22386 7 7.5C7 7.77614 7.22386 8 7.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H7.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10H10.5C10.7761 10 11 9.77614 11 9.5C11 9.22386 10.7761 9 10.5 9H7.5ZM1 4C1 2.89543 1.89543 2 3 2H11C12.1046 2 13 2.89543 13 4C14.1046 4 15 4.89543 15 6V10.5C15 11.8807 13.8807 13 12.5 13H3.5C2.11929 13 1 11.8807 1 10.5V4ZM12.5 10.5C12.2239 10.5 12 10.2761 12 10V4C12 3.44772 11.5523 3 11 3H3C2.44772 3 2 3.44772 2 4V10.5C2 11.3284 2.67157 12 3.5 12H12.5C13.3284 12 14 11.3284 14 10.5V6C14 5.44772 13.5523 5 13 5V10C13 10.2761 12.7761 10.5 12.5 10.5Z");
  const shoppingBag16Icon = inlineIcon(16, "M5 5V3C5 1.89543 5.89543 1 7 1C7.36429 1 7.70584 1.0974 8.00002 1.26757C8.29419 1.0974 8.63574 1 9.00003 1C10.1046 1 11 1.89543 11 3V5H11.5C12.3284 5 13 5.67157 13 6.5V13C13 14.1046 12.1046 15 11 15H5C3.89543 15 3 14.1046 3 13V6.5C3 5.67157 3.67157 5 4.5 5H5ZM6 3V5H8V3C8 2.44772 7.55228 2 7 2C6.44772 2 6 2.44772 6 3ZM11 14C11.5523 14 12 13.5523 12 13V6.5C12 6.22386 11.7761 6 11.5 6H10V13C10 13.5523 10.4477 14 11 14ZM9 6H4.5C4.22386 6 4 6.22386 4 6.5V13C4 13.5523 4.44772 14 5 14H9.26756C9.09739 13.7058 9 13.3643 9 13V6ZM9 3V5H10V3C10 2.44772 9.55232 2 9.00003 2C8.91378 2 8.83009 2.01092 8.75025 2.03145C8.90939 2.31841 9 2.64862 9 3Z");
  const moreVertical16Icon = inlineIcon(16, "M8 5C7.44772 5 7 4.55228 7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5ZM8 9C7.44771 9 7 8.55229 7 8C7 7.44772 7.44771 7 8 7C8.55228 7 9 7.44772 9 8C9 8.55229 8.55228 9 8 9ZM7 12C7 12.5523 7.44771 13 8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44771 11 7 11.4477 7 12Z");
  const location16Icon = inlineIcon(16, "M8 1C11.3137 1 14 3.68629 14 7C14 9.87377 10.9031 13.016 9.15918 14.5576C8.49082 15.1484 7.50918 15.1484 6.84082 14.5576C5.09688 13.016 2 9.87377 2 7C2 3.68629 4.68629 1 8 1ZM8 2C5.23858 2 3 4.23858 3 7C3 8.10839 3.61436 9.39536 4.56934 10.6826C5.50328 11.9415 6.65741 13.0603 7.50391 13.8086C7.79391 14.0647 8.20609 14.0647 8.49609 13.8086C9.34259 13.0603 10.4967 11.9415 11.4307 10.6826C12.3856 9.39536 13 8.10839 13 7C13 4.23858 10.7614 2 8 2ZM8 4.75C9.24264 4.75 10.25 5.75736 10.25 7C10.25 8.24264 9.24264 9.25 8 9.25C6.75736 9.25 5.75 8.24264 5.75 7C5.75 5.75736 6.75736 4.75 8 4.75ZM8 5.75C7.30964 5.75 6.75 6.30964 6.75 7C6.75 7.69036 7.30964 8.25 8 8.25C8.69036 8.25 9.25 7.69036 9.25 7C9.25 6.30964 8.69036 5.75 8 5.75Z");
  const chatHelp20Icon = inlineIcon(20, "M9.25028 7.30723C9.08872 7.49072 9.00001 7.74463 9.00001 8C9.00001 8.27614 8.77615 8.5 8.50001 8.5C8.22387 8.5 8.00001 8.27614 8.00001 8C8.00001 7.52689 8.1613 7.0308 8.49974 6.64641C8.84684 6.25219 9.3597 6 10 6C10.6403 6 11.1532 6.25219 11.5003 6.64641C11.8387 7.0308 12 7.52689 12 8C12 8.48947 11.8839 8.86964 11.6976 9.18921C11.5347 9.46855 11.3225 9.68963 11.1528 9.86652L11.1115 9.90956C10.9247 10.1051 10.7821 10.2639 10.6773 10.4641C10.5773 10.6551 10.5 10.9085 10.5 11.2929C10.5 11.5691 10.2762 11.7929 10 11.7929C9.72387 11.7929 9.50001 11.5691 9.50001 11.2929C9.50001 10.7611 9.61018 10.3464 9.79143 10.0002C9.96788 9.66319 10.2003 9.41576 10.3885 9.21878L10.4106 9.19559C10.5985 8.99908 10.7328 8.85858 10.8337 8.68547C10.9286 8.52273 11 8.31707 11 8C11 7.74463 10.9113 7.49072 10.7497 7.30723C10.5968 7.13358 10.3597 7 10 7C9.64033 7 9.40318 7.13358 9.25028 7.30723ZM9.99991 14.2122C10.3863 14.2122 10.6995 13.899 10.6995 13.5126C10.6995 13.1262 10.3863 12.813 9.99991 12.813C9.61353 12.813 9.3003 13.1262 9.3003 13.5126C9.3003 13.899 9.61353 14.2122 9.99991 14.2122ZM2.00001 10C2.00001 5.58172 5.58173 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C8.65078 18 7.37829 17.6656 6.26225 17.0748L2.62128 17.9851C2.45089 18.0277 2.27065 17.9777 2.14646 17.8536C2.02227 17.7294 1.97234 17.5491 2.01494 17.3787L2.92518 13.7378C2.33442 12.6217 2.00001 11.3492 2.00001 10ZM10 3C6.13402 3 3.00001 6.13401 3.00001 10C3.00001 11.245 3.32462 12.4128 3.89345 13.4247C3.95602 13.536 3.97363 13.6671 3.94266 13.791L3.18719 16.8128L6.20904 16.0574C6.33294 16.0264 6.46399 16.044 6.57531 16.1066C7.58726 16.6754 8.75497 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z");
  const chevronRight20Icon = inlineIcon(20, "M7.64582 4.14708C7.84073 3.95147 8.15731 3.9509 8.35292 4.14582L13.8374 9.6108C14.0531 9.82574 14.0531 10.1751 13.8374 10.39L8.35292 15.855C8.15731 16.0499 7.84073 16.0493 7.64582 15.8537C7.4509 15.6581 7.45147 15.3415 7.64708 15.1466L12.8117 10.0004L7.64708 4.85418C7.45147 4.65927 7.4509 4.34269 7.64582 4.14708Z");
  const thumbLike16Icon = inlineIcon(16, "M7.73863 1.98256C7.90951 1.27443 8.68256 0.797238 9.41148 1.07826L9.41246 1.07631L9.41343 1.07729L9.41734 1.07826C9.41925 1.07898 9.42175 1.08032 9.42418 1.08119C9.73064 1.18843 10.0106 1.39117 10.2377 1.6183C10.6402 2.02122 11.0146 2.67154 11.014 3.65345C11.0136 4.21255 10.8733 4.97219 10.7445 5.55872C10.7097 5.71712 10.6713 5.86603 10.639 6.00012H11.4935C13.0633 6.00035 14.2448 7.43023 13.9486 8.97179L13.3353 12.1632C12.9503 14.1648 10.9423 15.4158 8.97593 14.879L3.76597 13.4562C3.02947 13.255 2.47172 12.6514 2.32847 11.9015L2.0316 10.3439C1.836 9.31711 2.46811 8.39003 3.31675 7.9757C6.27958 6.5299 7.3692 3.51314 7.73863 1.98256ZM9.05992 2.01185C9.0017 1.98746 8.93057 1.98948 8.85875 2.02846C8.78521 2.06857 8.73042 2.13796 8.71129 2.21693C8.32204 3.82971 7.13208 7.22632 3.75523 8.87414C3.2178 9.13658 2.92092 9.66886 3.01402 10.1573L3.30992 11.714C3.38155 12.0889 3.66144 12.3907 4.02964 12.4913L9.23961 13.9142C10.6441 14.2975 12.0788 13.4043 12.3539 11.9747L12.9671 8.78332C13.1449 7.85838 12.4353 7.00035 11.4935 7.00012H9.9984C9.84234 7.00005 9.69447 6.92702 9.59996 6.80285C9.50558 6.67856 9.47529 6.5167 9.51695 6.36633L9.51793 6.36145C9.51878 6.35835 9.52013 6.35304 9.52183 6.3468C9.52537 6.33387 9.53074 6.31421 9.53746 6.28918C9.55107 6.23847 9.57053 6.16354 9.5941 6.07141C9.64135 5.88669 9.70509 5.63001 9.76793 5.34387C9.89671 4.75734 10.0136 4.09312 10.014 3.65345C10.0145 2.954 9.75828 2.55224 9.53062 2.32435C9.41244 2.20618 9.29417 2.12798 9.20836 2.08021C9.16592 2.05664 9.13123 2.0402 9.1107 2.03139C9.09404 2.02426 9.07686 2.01827 9.05992 2.01185Z");
  const thumbDislike16Icon = inlineIcon(16, "M8.97593 1.12051C10.9423 0.583722 12.9503 1.83464 13.3353 3.83632L13.9485 7.02771C14.2448 8.56929 13.0632 9.99915 11.4935 9.99938H10.639C10.6713 10.1335 10.7097 10.2824 10.7445 10.4408C10.8733 11.0273 11.0136 11.787 11.014 12.346C11.0145 13.3279 10.6402 13.9783 10.2376 14.3812C10.0413 14.5776 9.84417 14.7096 9.6937 14.7933C9.61848 14.8351 9.55364 14.8663 9.50523 14.8871C9.46941 14.9024 9.44067 14.9125 9.42417 14.9183C9.42174 14.9192 9.41926 14.9205 9.41734 14.9212L9.41343 14.9222L9.41245 14.9232L9.41148 14.9212C8.68254 15.2023 7.90953 14.7251 7.73864 14.0169C7.3692 12.4863 6.27958 9.4696 3.3168 8.0238C2.46815 7.60947 1.83606 6.68242 2.03166 5.65565L2.32853 4.09804C2.47178 3.34813 3.0295 2.74455 3.76602 2.54336L8.97593 1.12051ZM12.3538 4.02479C12.0788 2.59514 10.6441 1.70202 9.2396 2.08535L4.02969 3.5082C3.66147 3.6088 3.3816 3.91061 3.30997 4.28554L3.01407 5.84217C2.92097 6.33066 3.21783 6.86293 3.75528 7.12537C7.13208 8.77319 8.32203 12.1698 8.71129 13.7826C8.73042 13.8615 8.7852 13.9309 8.85875 13.971C8.93059 14.01 9.00169 14.0121 9.05992 13.9876C9.11127 13.9682 9.16013 13.9461 9.20835 13.9193C9.29417 13.8715 9.41244 13.7933 9.53062 13.6751C9.75827 13.4472 10.0144 13.0455 10.014 12.346C10.0136 11.9064 9.8967 11.2421 9.76792 10.6556C9.70508 10.3695 9.64134 10.1128 9.59409 9.92809C9.57053 9.83596 9.55107 9.76103 9.53745 9.71032C9.49003 9.5337 9.48029 9.35423 9.59995 9.19665C9.69447 9.07249 9.84233 8.99944 9.99839 8.99938H11.4935C12.4353 8.99916 13.1449 8.14113 12.9671 7.21619L12.3538 4.02479Z");
  const chevronLeft16Icon = inlineIcon(16, "M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z");
  const chat16Icon = inlineIcon(16, "M7.99996 1C11.866 1 15 4.13401 15 8.00002C15 11.866 11.866 15 7.99996 15C6.70924 15 5.49994 14.6488 4.46187 14.0391L1.65816 14.9746C1.4786 15.0344 1.28028 14.9873 1.14644 14.8535C1.0127 14.7197 0.965574 14.5214 1.02534 14.3418L1.95894 11.5362C1.3501 10.4985 0.999952 9.28978 0.999952 8.00002C0.999952 4.13412 4.13412 1.00018 7.99996 1ZM7.99996 2C4.6864 2.00018 1.99995 4.68641 1.99995 8.00002C1.99995 9.18013 2.34144 10.2792 2.92964 11.2071C3.01008 11.3339 3.02986 11.4903 2.98238 11.6328L2.28999 13.708L4.36617 13.0166C4.51606 12.9842 4.65578 12.9831 4.79195 13.0694C5.7201 13.6581 6.81951 14 7.99996 14C11.3137 14 14 11.3137 14 8.00002C14 4.6863 11.3137 2 7.99996 2ZM8.49997 9.00002C8.77611 9.00002 8.99997 9.22388 8.99997 9.50002C8.99997 9.77616 8.77611 10 8.49997 10H5.49996C5.22396 9.99985 4.99996 9.77606 4.99996 9.50002C4.99996 9.22398 5.22396 9.00019 5.49996 9.00002H8.49997ZM10.5 6.00001C10.7761 6.00001 11 6.22387 11 6.50001C11 6.77616 10.7761 7.00001 10.5 7.00001H5.49996C5.22396 6.99984 4.99996 6.77605 4.99996 6.50001C4.99996 6.22398 5.22396 6.00018 5.49996 6.00001H10.5Z");
  const trophy20Icon = inlineIcon(20, "M2.99609 6.99804C2.99609 8.52171 4.13769 9.77722 5.60593 9.97185C6.01527 11.8314 7.5748 13.2597 9.50063 13.4726V14.9684H7.50426C6.39969 14.9684 5.50426 15.8638 5.50426 16.9684V17.4684C5.50426 17.7446 5.72811 17.9684 6.00426 17.9684H14.0043C14.2804 17.9684 14.5043 17.7446 14.5043 17.4684V16.9684C14.5043 15.8638 13.6088 14.9684 12.5043 14.9684H10.5006V13.4726C12.4257 13.2599 13.9848 11.8328 14.395 9.97434C15.8629 9.78134 16.9961 8.52535 16.9961 7.0047V5.50006C16.9961 4.67163 16.3245 4.00006 15.4961 4.00006H14.5007C14.4997 2.89636 13.6047 2.00195 12.5007 2.00195H7.50073C6.39679 2.00195 5.50176 2.89636 5.50073 4.00006H4.49609C3.66767 4.00006 2.99609 4.67163 2.99609 5.50006V6.99804ZM4.49609 5.00006H5.50073V8.93434C4.63664 8.71114 3.99609 7.92741 3.99609 6.99804V5.50006C3.99609 5.22392 4.21995 5.00006 4.49609 5.00006ZM14.5007 5.00006H15.4961C15.7722 5.00006 15.9961 5.22392 15.9961 5.50006V7.0047C15.9961 7.93404 15.3608 8.71499 14.5007 8.9369V5.00006ZM13.5007 4.00195V9.00006C13.5007 10.9331 11.9337 12.5001 10.0007 12.5001C8.12004 12.5001 6.5858 11.0167 6.50415 9.15614V4.00006H6.50073C6.50176 3.44865 6.94908 3.00195 7.50073 3.00195H12.5007C13.053 3.00195 13.5007 3.44967 13.5007 4.00195ZM6.50426 16.9684C6.50426 16.4161 6.95197 15.9684 7.50426 15.9684H12.5043C13.0565 15.9684 13.5043 16.4161 13.5043 16.9684H6.50426Z");
  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function renderHeaderTab(label, icon, active = false) {
    return `<button class="bing-serp__header-tab${active ? " is-active" : ""}" type="button"${active ? ' aria-current="page"' : ""}>
      <span class="bing-serp__header-tab-inner">${icon}<span>${label}</span></span>
    </button>`;
  }

  function renderAlgoHeader(site = "Lucerne Publishing", domain = "lucernepublishing.com", slug = "") {
    return `<div class="bing-serp__algo-header">
      <span class="bing-serp__favicon" aria-hidden="true"><span></span></span>
      <div class="bing-serp__site-attribution">
        <span class="bing-serp__site-name">${escapeHTML(site)}</span>
        <div class="bing-serp__site-url"><a href="#">${escapeHTML(slug ? `${domain} › ${slug}` : domain)}</a><span class="bing-serp__url-caret">${chevronDownIcon}</span></div>
      </div>
    </div>`;
  }

  function renderResultList(links) {
    return `<div class="bing-serp__explore-list">
      ${links.map(([label, domain]) => `<div class="bing-serp__explore-row">
        <span class="bing-serp__small-favicon" aria-hidden="true"></span>
        <a href="#">${escapeHTML(label)}</a>
        <span class="bing-serp__explore-domain">${escapeHTML(domain)}</span>
      </div>`).join("")}
    </div>`;
  }

  function renderRichAlgo(content) {
    const tabs = content.tabs.slice(0, 3);
    return `<section class="bing-serp__algoblock bing-serp__algoblock--rich" aria-label="Search result">
      ${renderAlgoHeader("Lucerne Publishing", "lucernepublishing.com", content.slug)}
      <div class="bing-serp__algo-body bing-serp__algo-body--rich">
        <h2 class="bing-serp__algo-title"><a href="#">${escapeHTML(content.richTitle)}</a></h2>
        <div class="bing-serp__rich-snippet">
          <div class="bing-serp__rich-meta"><span class="bing-serp__web-badge">Web</span><span>${content.date}</span><span aria-hidden="true">·</span></div>
          <p>${escapeHTML(content.description)}</p>
        </div>
        <div class="bing-serp__algo-details">
          <div class="bing-serp__tabs-shell" aria-label="Result details">
            <button class="bing-serp__row-scroll bing-serp__row-scroll--left" type="button" aria-label="Scroll result tabs left" data-scroll-target=".bing-serp__body-tabs" data-scroll-direction="-1">${chevronLeft16Icon}</button>
            <div class="bing-serp__body-tabs" role="tablist" aria-label="Result details">
              ${tabs.map((tab, index) => `<button id="bing-tab-${tab.id}" class="bing-serp__body-tab${index === 0 ? " is-active" : ""}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="bing-panel-${tab.id}" tabindex="${index === 0 ? "0" : "-1"}">${tab.label}</button>`).join("")}
            </div>
            <button class="bing-serp__row-scroll bing-serp__row-scroll--right" type="button" aria-label="Scroll result tabs right" data-scroll-target=".bing-serp__body-tabs" data-scroll-direction="1">${chevronRightIcon}</button>
          </div>
          ${tabs.map((tab, index) => `<div id="bing-panel-${tab.id}" class="bing-serp__expanded-snippet${index === 0 ? " is-active" : ""}" role="tabpanel" aria-labelledby="bing-tab-${tab.id}"${index !== 0 ? " hidden" : ""}><p>${escapeHTML(content.description)}</p><a href="#">See more</a></div>`).join("")}
        </div>
      </div>
      <div class="bing-serp__algo-footer">
        <div class="bing-serp__explore-title">EXPLORE FURTHER</div>
        ${renderResultList(tabs[0].links)}
        <div class="bing-serp__recommendation">Recommended to you based on what's popular · <a href="#">Feedback</a></div>
      </div>
    </section>`;
  }

  function renderQuestionCard(question, content) {
    return `<article class="bing-serp__question-card">
      <div class="bing-serp__question-title">
        <h3>${escapeHTML(question)}</h3>
        <span class="bing-serp__question-icon">${chatHelp20Icon}</span>
      </div>
      <div class="bing-serp__answer">
        <p>${escapeHTML(`${content.name} is widely recognized for its history and the milestones that shaped it. Here is a short summary of what people most often want to know.`)}</p>
        <div class="bing-serp__question-divider"></div>
        <div class="bing-serp__answer-link">
          <a href="#">${escapeHTML(question)} | Trey Research</a>
          <a class="bing-serp__answer-attribution" href="#"><span class="bing-serp__small-favicon" aria-hidden="true"></span>treyresearch.net</a>
        </div>
      </div>
    </article>`;
  }

  function renderPeopleAlsoAsk(content) {
    return `<section class="bing-serp__people" aria-labelledby="bing-people-heading">
      <div class="bing-serp__section-title bing-serp__section-title--people"><h2 id="bing-people-heading">People also ask</h2></div>
      <div class="bing-serp__people-carousel">
        <div class="bing-serp__people-track" aria-label="Questions">
          ${content.questions.map(question => renderQuestionCard(question, content)).join("")}
        </div>
        <button class="bing-serp__carousel-next" type="button" aria-label="Next questions" data-scroll-target=".bing-serp__people-track" data-scroll-direction="1">${chevronRight20Icon}</button>
      </div>
      <div class="bing-serp__people-feedback">
        <span>Feedback</span>
        <button type="button" aria-label="Helpful">${thumbLike16Icon}</button>
        <button type="button" aria-label="Not helpful">${thumbDislike16Icon}</button>
      </div>
    </section>`;
  }

  function renderSimpleAlgo(content, index) {
    const result = content.plainResults[index - 1];
    return `<section class="bing-serp__algoblock bing-serp__algoblock--simple" aria-label="Search result">
      ${renderAlgoHeader(result[1], result[2], content.slug)}
      <div class="bing-serp__algo-body bing-serp__algo-body--simple">
        <h2 class="bing-serp__algo-title"><a href="#">${escapeHTML(result[0])}</a></h2>
        <p class="bing-serp__simple-snippet">${escapeHTML(result[3])}</p>
      </div>
    </section>`;
  }

  function renderNewsCard([source, time, title], index) {
    return `<article class="bing-serp__news-card">
      <div class="bing-serp__news-copy">
        <div class="bing-serp__news-meta"><span>${source}</span><span aria-hidden="true">·</span><span>${time}</span></div>
        <a href="#">${escapeHTML(title)}</a>
      </div>
      <span class="bing-serp__news-thumbnail" aria-hidden="true" data-news-image="${index}"></span>
    </article>`;
  }

  function renderNews(content) {
    return `<section class="bing-serp__news" aria-labelledby="bing-news-heading">
      <div class="bing-serp__news-results">
        <div class="bing-serp__section-title bing-serp__section-title--news"><h2 id="bing-news-heading">News</h2></div>
        <div class="bing-serp__news-grid">${content.news.map(renderNewsCard).join("")}</div>
      </div>
      <div class="bing-serp__explore-news">
        <h2>Explore more news</h2>
        <div class="bing-serp__news-topics">
        ${content.newsTopics.map(topic => `<button type="button"><span aria-hidden="true"></span>${topic}</button>`).join("")}
        </div>
      </div>
    </section>`;
  }

  function renderRelatedSearches(content) {
    return `<section class="bing-serp__related" aria-labelledby="bing-related-heading">
      <h2 id="bing-related-heading">Related searches for ${escapeHTML(content.name)}</h2>
      <div class="bing-serp__related-grid">
        ${content.related.map(item => `<a href="#" class="bing-serp__related-item">${search16Icon}<span>${escapeHTML(item)}</span></a>`).join("")}
      </div>
    </section>`;
  }

  function renderFooter() {
    const links = ["Privacy and Cookies", "Legal", "Advertise", "About our ads", "Help", "Feedback"];
    const pageButtons = Array.from({ length: 6 }, (_, index) => {
      const page = index + 1;
      return `<button class="bing-serp__page-number${page === 1 ? " is-active" : ""}" type="button"${page === 1 ? ' aria-current="page"' : ""}>${page}</button>`;
    }).join("");

    return `<footer class="bing-serp__footer">
      <div class="bing-serp__footer-top">
        <nav class="bing-serp__pagination" aria-label="Pagination">
          <button class="bing-serp__pagination-chevron" type="button" aria-label="Previous page">${chevronLeft16Icon}</button>
          <div class="bing-serp__page-numbers">${pageButtons}</div>
          <button class="bing-serp__pagination-chevron" type="button" aria-label="Next page">${chevronRightIcon}</button>
        </nav>
        <button class="bing-serp__chat-button" type="button">${chat16Icon}<span>Chat</span></button>
      </div>
      <div class="bing-serp__footer-bottom">
        <nav class="bing-serp__footer-links" aria-label="Footer links">
          ${links.map(link => `<a href="#">${link}</a>`).join("")}
        </nav>
        <span class="bing-serp__copyright">© 2024 Microsoft</span>
      </div>
    </footer>`;
  }

  class BingSerp extends HTMLElement {
    static get observedAttributes() {
      return ["entity", "platform"];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (["entity", "platform"].includes(name) && oldValue !== newValue && this.isConnected) this.render();
    }

    render() {
      const entity = this.getAttribute("entity") || "company";
      const platform = this.getAttribute("platform") === "mobile" ? "mobile" : "desktop";
      const data = window.KC_ENTITIES?.[entity]?.[platform];
      if (!data) {
        console.error(`No ${platform} KC entity data found for <bing-serp> (${entity}).`);
        return;
      }

      const title = escapeHTML(data.hero.title);
      const content = window.BING_CONTENT?.forEntity(entity);
      if (!content) {
        console.error(`BING_CONTENT must load before <bing-serp> (${entity}).`);
        return;
      }
      if (platform === "mobile") {
        this.renderMobile(entity, title, content);
        this.bindInteractions();
        return;
      }

      const headerTabs = [
        renderHeaderTab("ALL", search16Icon, true),
        renderHeaderTab("COPILOT", chatSparkle16Icon),
        renderHeaderTab("IMAGES", image16Icon),
        renderHeaderTab("VIDEOS", video16Icon),
        renderHeaderTab("MAPS", map16Icon),
        renderHeaderTab("NEWS", news16Icon),
        renderHeaderTab("SHOPPING", shoppingBag16Icon),
        renderHeaderTab("MORE", moreVertical16Icon)
      ].join("");

      this.innerHTML = `<header class="bing-serp__header">
        <div class="bing-serp__header-inner">
          <div class="bing-serp__topbar">
            <div class="bing-serp__search-container">
              <div class="bing-serp__search-form">
                <img class="bing-serp__wordmark" src="../assets/images/brand/microsoft-bing.svg" alt="Microsoft Bing">
                <div class="bing-serp__search-box" role="search">
                  <div class="bing-serp__search-input">${search20Icon}<input type="search" aria-label="Search" value="${title}" readonly></div>
                  <div class="bing-serp__search-actions">
                    <button class="bing-serp__search-action" type="button" aria-label="Microphone">${mic20Icon}</button>
                    <button class="bing-serp__search-action" type="button" aria-label="Visual search">${imageSearch20Icon}</button>
                  </div>
                </div>
              </div>
              <button class="bing-serp__copilot-button" type="button" aria-label="Copilot"><img src="../assets/images/windows/copilot-toolbar.svg" width="24" height="24" alt=""></button>
            </div>
            <div class="bing-serp__identity">
              <div class="bing-serp__identity-controls">
                <button class="bing-serp__signin" type="button">Sign in</button>
                <button class="bing-serp__rewards" type="button" aria-label="Rewards, 5 points"><span>5</span><span class="bing-serp__rewards-icon">${trophy20Icon}</span></button>
                <button class="bing-serp__hamburger" type="button" aria-label="Menu"><span aria-hidden="true"><i></i><i></i><i></i></span></button>
              </div>
            </div>
          </div>
          <nav class="bing-serp__header-tabs" aria-label="Search categories"><div class="bing-serp__header-tabs-track">${headerTabs}</div></nav>
        </div>
      </header>
      <section class="bing-serp__controls" aria-label="Search filters">
        <div class="bing-serp__filter-row">
          <span class="bing-serp__result-count">About <span>98,700,000</span> results</span>
          <button class="bing-serp__filter-button" type="button">Any time ${chevronDownIcon}</button>
          <span class="bing-serp__location"><span class="bing-serp__location-icon">${location16Icon}</span><span>Results near City, State</span><span aria-hidden="true">·</span><a href="#">Change</a></span>
          <span class="bing-serp__toggle-group">
            <label class="bing-serp__toggle-label" for="bing-open-links-in-new-tab">Open links in new tab</label>
            <input id="bing-open-links-in-new-tab" class="bing-serp__toggle" type="checkbox" checked aria-label="Open links in new tab">
          </span>
        </div>
        <div class="bing-serp__entity-row">
          <div class="bing-serp__entity-info">
            <h1>${title}</h1>
          <p>${escapeHTML(content.description)}</p>
          </div>
          <div class="bing-serp__pills">${content.tabs.map(tab => `<span>${tab.label}</span>`).join("")}<span>More</span></div>
        </div>
      </section>
      <div class="bing-serp__body">
        <main class="bing-serp__mainline" aria-label="Search results">
          ${renderRichAlgo(content)}
          ${renderPeopleAlsoAsk(content)}
          ${renderSimpleAlgo(content, 1)}
          ${renderSimpleAlgo(content, 2)}
          ${renderNews(content)}
          ${renderSimpleAlgo(content, 3)}
          ${renderRelatedSearches(content)}
        </main>
        <aside class="bing-serp__rail" aria-label="Knowledge card">
          <kc-card entity="${escapeHTML(entity)}" platform="desktop"></kc-card>
        </aside>
      </div>${renderFooter()}`;

      this.bindInteractions();
    }

    renderMobile(entity, title, content) {
      const headerTabs = [
        renderHeaderTab("ALL", search16Icon, true),
        renderHeaderTab("COPILOT", chatSparkle16Icon),
        renderHeaderTab("IMAGES", image16Icon),
        renderHeaderTab("VIDEOS", video16Icon),
        renderHeaderTab("MAPS", map16Icon),
        renderHeaderTab("NEWS", news16Icon),
        renderHeaderTab("SHOPPING", shoppingBag16Icon),
        renderHeaderTab("MORE", moreVertical16Icon)
      ].join("");

      this.innerHTML = `<div class="bing-serp__mobile-page">
        <h1 class="bing-serp__visually-hidden">${title}</h1>
        <header class="bing-serp__mobile-header">
          <div class="bing-serp__mobile-brand-row">
            <img class="bing-serp__wordmark" src="../assets/images/brand/microsoft-bing.svg" alt="Microsoft Bing">
            <button class="bing-serp__hamburger" type="button" aria-label="Menu"><span aria-hidden="true"><i></i><i></i><i></i></span></button>
          </div>
          <div class="bing-serp__mobile-search">
            <div class="bing-serp__mobile-search-field">${search20Icon}<input type="search" aria-label="Search" value="${title}" readonly></div>
            <div class="bing-serp__search-actions">
              <button class="bing-serp__search-action" type="button" aria-label="Microphone">${mic20Icon}</button>
              <button class="bing-serp__search-action" type="button" aria-label="Visual search">${imageSearch20Icon}</button>
            </div>
          </div>
          <nav class="bing-serp__mobile-tabs" aria-label="Search categories">${headerTabs}</nav>
        </header>
        <div class="bing-serp__mobile-location">
          <span class="bing-serp__location-icon">${location16Icon}</span>
          <span>Results near City, State</span>
          <span aria-hidden="true">·</span>
          <span>Based on IP address</span>
          <a href="#">Change</a>
        </div>
        <main class="bing-serp__mobile-mainline" aria-label="Search results">
          <div class="bing-serp__mobile-card-wrap"><kc-card entity="${escapeHTML(entity)}" platform="mobile"></kc-card></div>
          <section class="bing-serp__mobile-algoblock" aria-label="Search answer">
            ${renderAlgoHeader("Lucerne Publishing", "lucernepublishing.com", content.slug)}
            <h2 class="bing-serp__mobile-result-title"><a href="#">${escapeHTML(content.richTitle)}</a></h2>
            <div class="bing-serp__mobile-result-meta"><span class="bing-serp__web-badge">Web</span><span>·</span><span>${content.date}</span></div>
            <p class="bing-serp__mobile-snippet">${escapeHTML(content.description)}</p>
            <nav class="bing-serp__mobile-answer-tabs" role="tablist" aria-label="Answer sections">
              ${content.tabs.map((tab, index) => `<button id="bing-mobile-tab-${tab.id}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="bing-mobile-panel-${tab.id}" tabindex="${index === 0 ? "0" : "-1"}">${tab.label}</button>`).join("")}
            </nav>
            <div class="bing-serp__mobile-explore" role="tabpanel" aria-live="polite">
              <h3>Explore further</h3>
              ${renderResultList(content.tabs[0].links)}
            </div>
            <button class="bing-serp__mobile-see-more" type="button">See more</button>
            <div class="bing-serp__mobile-feedback">
              <span>Was this helpful?</span>
              <button type="button" aria-label="Helpful">${thumbLike16Icon}</button>
              <button type="button" aria-label="Not helpful">${thumbDislike16Icon}</button>
            </div>
          </section>
          ${renderPeopleAlsoAsk(content)}
          ${renderSimpleAlgo(content, 1)}
          ${renderNews(content)}
          <button class="bing-serp__mobile-see-more-results" type="button">See more results</button>
          ${renderRelatedSearches(content)}
        </main>
      </div>`;
    }

    bindInteractions() {
      const activateTabs = (tabs, panels) => {
        tabs.forEach((tab, index) => {
          tab.addEventListener("click", () => {
            tabs.forEach((candidate, candidateIndex) => {
              const selected = candidateIndex === index;
              candidate.classList.toggle("is-active", selected);
              candidate.setAttribute("aria-selected", String(selected));
              candidate.setAttribute("aria-current", selected ? "page" : "false");
              candidate.tabIndex = selected ? 0 : -1;
            });
            panels.forEach((panel, panelIndex) => {
              panel.hidden = panelIndex !== index;
            });
          });
          tab.addEventListener("keydown", event => {
            let nextIndex = index;
            if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
            if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
            if (event.key === "Home") nextIndex = 0;
            if (event.key === "End") nextIndex = tabs.length - 1;
            if (nextIndex === index) return;
            event.preventDefault();
            tabs[nextIndex].focus();
            tabs[nextIndex].click();
          });
        });
      };
      this.querySelectorAll(".bing-serp__tabs-shell").forEach(shell => {
        activateTabs(
          [...shell.querySelectorAll('[role="tab"]')],
          [...shell.parentElement.querySelectorAll('[role="tabpanel"]')]
        );
      });
      this.querySelectorAll(".bing-serp__mobile-answer-tabs").forEach(tablist => {
        const tabs = [...tablist.querySelectorAll('[role="tab"]')];
        const panel = tablist.nextElementSibling;
        const content = window.BING_CONTENT?.forEntity(this.getAttribute("entity"));
        activateTabs(tabs, tabs.map((tab, index) => ({
          get hidden() { return index !== tabs.findIndex(candidate => candidate.getAttribute("aria-selected") === "true"); },
          set hidden(value) { if (!value) panel.innerHTML = `<h3>Explore further</h3>${renderResultList(content.tabs[index].links)}`; }
        })));
      });
      this.querySelectorAll(".bing-serp__row-scroll, .bing-serp__carousel-next").forEach(button => {
        const scroller = this.querySelector(button.dataset.scrollTarget);
        if (!scroller) return;
        button.addEventListener("click", () => {
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          scroller.scrollBy({
            left: scroller.clientWidth * 0.75 * Number(button.dataset.scrollDirection),
            behavior: reducedMotion ? "auto" : "smooth"
          });
        });
      });

      this.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener("click", event => event.preventDefault());
      });
      this.querySelectorAll(".bing-serp__page-number").forEach(button => {
        button.addEventListener("click", () => {
          this.querySelectorAll(".bing-serp__page-number").forEach(page => {
            const selected = page === button;
            page.classList.toggle("is-active", selected);
            if (selected) page.setAttribute("aria-current", "page");
            else page.removeAttribute("aria-current");
          });
        });
      });
    }
  }

  customElements.define("bing-serp", BingSerp);
})();
