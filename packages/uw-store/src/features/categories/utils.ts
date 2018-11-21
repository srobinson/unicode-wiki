import {Category} from "@uw/domain"

export const organizeCategories = (categoryList: Category[]) => {
  const organised: Category[] = []

  categoryList.filter((category: Category) => category.parent === 0).map((category: Category) => {
    const children = categoryList.filter((child: Category) => child.parent === category.index)
    organised.push(category)
    organised.push(...children)
  })

  return organised
}
