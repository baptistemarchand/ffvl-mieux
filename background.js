chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: 'off'
    });
  });
    
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url.match(/parapente.ffvl.fr\/user\/\d+\/inscriptions/)) {
    return
  }

  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'on' ? 'off' : 'on';

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  });

  if (nextState === 'on') {
    await chrome.scripting.insertCSS({
      files: ['compet.css'],
      target: { tabId: tab.id }
    });

    await chrome.scripting.executeScript({
      target : {tabId : tab.id},
      files : [ "compet.js" ],
    })

  } else if (nextState === 'off') {
    await chrome.scripting.removeCSS({
      files: ['compet.css'],
      target: { tabId: tab.id }
    });
  }
});
