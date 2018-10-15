# A <- read.csv('../public/data/business.csv')
# B <- A %>%
#   group_by(neighborhood, age_in_years) %>%
#   summarise(openings_in_year_in_neighbborhood=n()) %>%
#   ungroup()
# C <- A %>%
#   group_by(neighborhood) %>%
#   summarise(openings_in_neighborhood=n()) %>%
#   ungroup() 
# D <- inner_join(B, C) %>%
#   mutate(pct_of_openings=openings_in_year_in_neighbborhood/openings_in_neighborhood) %>%
#   dplyr::filter(openings_in_neighborhood > 953.5)  # 50th percentile
# D$over_5 <- ifelse(D$pct_of_openings > 0.05, 1, 0)
# D$within20 <- ifelse(D$age_in_years < 20, 1, 0)
# E <- D %>% group_by(within20, neighborhood) %>%
#   summarise(pct=sum(pct_of_openings)) %>%
#   arrange(neighborhood, within20)

# Percent of open businesses under 20 years old
A <- read.csv('../public/data/business.csv')

B <- A %>% dplyr::filter(closed == 0) %>%
  group_by(neighborhood, age_in_years) %>%
  summarise(openings_in_year_in_neighborhood=n()) %>%
  ungroup()

C <- A %>%
  dplyr::filter(closed == 0) %>%
  group_by(neighborhood) %>%
  summarise(openings_in_neighborhood=n()) %>%
  ungroup() # %>% dplyr::filter(openings_in_neighborhood > 640)

D <- inner_join(B, C) %>%
  mutate(pct_of_openings=openings_in_year_in_neighborhood/openings_in_neighborhood)
D$within20 <- ifelse(D$age_in_years < 20, 1, 0)

E <- D %>% group_by(within20, neighborhood) %>%
  summarise(pct=sum(pct_of_openings)) %>%
  ungroup() %>%
  arrange(within20) %>%
  select(neighborhood, pct)

within20 <- A %>%
    dplyr::filter(!is.na(neighborhood), closed == 0) %>%
    mutate(under_20_years_old = age_in_years < 20) %>%
    group_by(under_20_years_old) %>%
    summarise(n=n())
# 87.778516% of businesses are under 20 years of age in SF

F <- ggplot(E, aes(x=reorder(neighborhood, pct), y=pct)) + geom_bar(stat='identity') +
  scale_y_continuous("% of businesses", label = percent) + 
  theme(axis.title.x=element_blank(),
        axis.text.x=element_blank(),
        axis.ticks.x=element_blank()) +
  geom_text(aes(label = neighborhood),
		angle = 90, color = 'white', nudge_y = -0.5, hjust = 0) +
  geom_hline(yintercept=0.8778516) +
  annotate("text",
        label="88% of business opened at least 20 years ago",
	x=15,
	y=0.8778516, vjust=-1) + ggtitle("Business Under 20 Years of Age")
F

write.csv(
  E,
  file = "../public/data/neighborhood_characteristics.csv",
  row.names = FALSE
)
