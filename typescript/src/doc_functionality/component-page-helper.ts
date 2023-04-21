export function findComponentMainDemo(
  page: DocumentationPage
): DocumentationPageBlock | undefined {
  const parent = page.parent;
  if (parent.groupBehavior === 'Tabs') {
    for (const children of parent.children) {
      const mainDemo = findComponentMainDemoInItem(
        children as DocumentationPage
      );
      if (mainDemo) {
        return mainDemo;
      }
    }
  } else {
    return findComponentMainDemoInItem(page);
  }
  return undefined;
}

function findComponentMainDemoInItem(
  item: DocumentationPage
): DocumentationPageBlock | undefined {
  for (const block of item.blocks) {
    if (block.type === 'Code') {
      if ((block as any).variantKey === 'egg-render-main') {
        return block;
      }
    }
  }

  return undefined;
}

function logObject(obj: any): void {
  Object.entries(obj).forEach(entry => {
    console.log(`-> ${entry[0]}:`);
    console.log(entry[1]);
  });
}

export function findComponentDescription(
  page: DocumentationPage
): DocumentationPageBlock[] {
  const parent = page.parent;
  if (parent.groupBehavior === 'Tabs') {
    for (const children of parent.children) {
      if (children.title === '__COMPONENT_DESCRIPTION__') {
        return (children as any).blocks;
      }
    }
  }
  return [];
}

export function findSharedComponentDemo(
  page: DocumentationPage
): DocumentationPageBlock[] {
  const parent = page.parent;
  if (parent.groupBehavior === 'Tabs') {
    for (const children of parent.children) {
      if (children.title === '__SHARED_DEMO__') {
        return (children as any).blocks;
      }
    }
  }
  return [];
}
