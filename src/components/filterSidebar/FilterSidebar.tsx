import { ExpandMore, FilterAlt, People, Person } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useState } from 'react';

export default function FilterSidebar() {
  const [categories, setCategories] = useState<string[]>([]);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>('categorias');

  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <aside className="py-4 flex flex-col gap-5 min-w-[16rem]">
      <div className="p-2 shadow-md rounded-xl">
        <div>
          <Accordion
            expanded={expandedAccordion === 'categorias'}
            onChange={(_event, isExpanded) => {
              setExpandedAccordion(isExpanded ? 'categorias' : false);
            }}
            sx={{
              boxShadow: 'none',
              padding: 0
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore fontSize="small" className="text-zinc-700" />}
              id="categories"
              sx={{
                '&> div.Mui-expanded': {
                  Height: 0,
                  margin: 0
                },
                '&> div': {
                  margin: 0
                },
                paddingX: 0,
                paddingTop: 2,
                alignItems: 'flex-start',
                justifyContent: 'center',
                maxHeight: '20px !important'
              }}
            >
              <FilterAlt className="text-zinc-700" />
              <strong className="font-medium text-[0.9rem] text-zinc-700 ml-5">Categorias</strong>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={() => handleCategoryChange('Atividade Física')}
                  >
                    <ListItemIcon sx={{ minWidth: '2rem' }}>
                      <Checkbox
                        edge="start"
                        checked={categories.includes('Atividade Física')}
                        tabIndex={-1}
                        disableRipple
                        size="small"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: '0.85rem' }}
                      primary={'Atividade Física'}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={() => handleCategoryChange('Estudos')}
                  >
                    <ListItemIcon sx={{ minWidth: '2rem' }}>
                      <Checkbox
                        edge="start"
                        checked={categories.includes('Estudos')}
                        tabIndex={-1}
                        disableRipple
                        size="small"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: '0.85rem' }}
                      primary={'Estudos'}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={() => handleCategoryChange('Ar Livre')}
                  >
                    <ListItemIcon sx={{ minWidth: '2rem' }}>
                      <Checkbox
                        edge="start"
                        checked={categories.includes('Ar Livre')}
                        tabIndex={-1}
                        disableRipple
                        size="small"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: '0.85rem' }}
                      primary={'Ar Livre'}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={() => handleCategoryChange('Leitura')}
                  >
                    <ListItemIcon sx={{ minWidth: '2rem' }}>
                      <Checkbox
                        edge="start"
                        checked={categories.includes('Leitura')}
                        tabIndex={-1}
                        disableRipple
                        size="small"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: '0.85rem' }}
                      primary={'Leitura'}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </div>

        <div>
          <Accordion
            expanded={expandedAccordion === 'cargo'}
            onChange={(_event, isExpanded) => {
              setExpandedAccordion(isExpanded ? 'cargo' : false);
            }}
            sx={{
              margin: '0 !important',
              border: 'none',
              boxShadow: 'none',
              padding: 0
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore fontSize="small" className="text-zinc-700" />}
              id="sectors"
              sx={{
                '&> div.Mui-expanded': {
                  minHeight: 0,
                  margin: 0
                },
                '&> div': {
                  margin: 0
                },
                paddingX: 0,
                paddingTop: 2,
                alignItems: 'flex-start',
                justifyContent: 'center'
              }}
            >
              <People className="text-zinc-700" />
              <strong className="font-medium text-[0.9rem] text-zinc-700 ml-5">Cargo</strong>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="text-[0.9rem] px-4 py-1">Cargos da empresa</div>
            </AccordionDetails>
          </Accordion>
        </div>

        <div>
          <Accordion
            expanded={expandedAccordion === 'departamento'}
            onChange={(_event, isExpanded) => {
              setExpandedAccordion(isExpanded ? 'departamento' : false);
            }}
            sx={{
              boxShadow: 'none',
              padding: 0
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore fontSize="small" className="text-zinc-700" />}
              id="age"
              sx={{
                '&> div.Mui-expanded': {
                  minHeight: 0,
                  margin: 0
                },
                '&> div': {
                  margin: 0
                },
                padding: 0,
                paddingTop: 2,
                alignItems: 'flex-start'
              }}
            >
              <Person className="text-zinc-700" />
              <strong className="font-medium text-[0.9rem] text-zinc-700 ml-5">Departamento</strong>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="text-[0.9rem] px-4 py-1">Departamentos da empresa</div>
            </AccordionDetails>
          </Accordion>
        </div>

        <div>
          <Accordion
            expanded={expandedAccordion === 'filial'}
            onChange={(_event, isExpanded) => {
              setExpandedAccordion(isExpanded ? 'filial' : false);
            }}
            sx={{
              boxShadow: 'none',
              padding: 0
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore fontSize="small" className="text-zinc-700" />}
              id="age"
              sx={{
                '&> div.Mui-expanded': {
                  minHeight: 0,
                  margin: 0
                },
                '&> div': {
                  margin: 0
                },
                padding: 0,
                paddingTop: 2,
                alignItems: 'flex-start'
              }}
            >
              <Person className="text-zinc-700" />
              <strong className="font-medium text-[0.9rem] text-zinc-700 ml-5">Filial</strong>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="text-[0.9rem] px-4 py-1">Filiais da empresa</div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <Button
        sx={{ fontSize: '0.9rem', padding: '0.4rem', borderRadius: '8px' }}
        variant="contained"
        fullWidth
      >
        Aplicar Filtros
      </Button>
    </aside>
  );
}