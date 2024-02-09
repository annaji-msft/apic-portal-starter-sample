import React from "react"
import {Accordion, Divider} from "@fluentui/react-components"
import FilterSection from "./FilterSection.tsx"
import {ApiFilters} from "../../../../constants.tsx"

import c from "./index.module.scss"

const Filters = () => {
    return (
        <section className={c.filters}>
            <h3>Filter by</h3>

            <Accordion multiple className={c.accordion} defaultOpenItems={Object.keys(ApiFilters)}>
                {Object.entries(ApiFilters).map(([key, value], index) => (
                    <React.Fragment key={key}>
                        <FilterSection filterKey={key} label={value.label} options={value.options} />
                        {index !== Object.entries(ApiFilters).length - 1 && <Divider className={c.divider} />}
                    </React.Fragment>
                ))}
            </Accordion>
        </section>
    )
}

export default Filters
