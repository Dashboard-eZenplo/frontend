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
import { useChartFilters } from '../../contexts/ChartFiltersContext';
import { usePossibleFilters } from '../../contexts/PossibleFiltersContext';
import SidebarListItem from '../SidebarListItem/SidebarListItem';

export default function FilterSidebar() {
  const { applyFilters } = useChartFilters();
  const { possibleFilters } = usePossibleFilters();

  const [categories, setCategories] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);

  const [selectAllCategories, setSelectAllCategories] = useState<boolean>(false);
  const [selectAllRoles, setSelectAllRoles] = useState<boolean>(false);
  const [selectAllDepartments, setSelectAllDepartments] = useState<boolean>(false);
  const [selectAllBranches, setSelectAllBranches] = useState<boolean>(false);

  const [expandedAccordion, setExpandedAccordion] = useState<string | false>('categorias');

  const handleCategoryChange = (category: string) => {
    setCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleRolesChange = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((item) => item !== role) : [...prev, role]
    );
  };

  const handleDepartmentsChange = (department: string) => {
    setDepartments((prev) =>
      prev.includes(department) ? prev.filter((item) => item !== department) : [...prev, department]
    );
  };

  const handleBranchesChange = (branch: string) => {
    setBranches((prev) =>
      prev.includes(branch) ? prev.filter((item) => item !== branch) : [...prev, branch]
    );
  };

  const handleSelectAllChange = (category: string) => {
    switch (category) {
      case 'categories':
        setCategories(selectAllCategories ? [] : possibleFilters.filters.category);
        setSelectAllCategories(!selectAllCategories);
        break;
      case 'roles':
        setRoles(selectAllRoles ? [] : possibleFilters.filters.position);
        setSelectAllRoles(!selectAllRoles);
        break;
      case 'departments':
        setDepartments(selectAllDepartments ? [] : possibleFilters.filters.department);
        setSelectAllDepartments(!selectAllDepartments);
        break;
      case 'branches':
        setBranches(selectAllBranches ? [] : possibleFilters.filters.branch);
        setSelectAllBranches(!selectAllBranches);
        break;
    }
  };

  const handleApplyFilters = () => {
    applyFilters({
      filters: {
        category: categories,
        role: roles,
        department: departments,
        branch: branches
      }
    });
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
            <AccordionDetails sx={{ padding: 0 }} className="overflow-y-scroll max-h-44 scrollbar">
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={() => handleSelectAllChange('categories')}
                  >
                    <ListItemIcon sx={{ minWidth: '2rem' }}>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        size="small"
                        checked={selectAllCategories}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                        fontWeight: '500'
                      }}
                      className="text-[85rem]"
                      primary="Selecionar todos"
                    />
                  </ListItemButton>
                </ListItem>

                {possibleFilters &&
                  possibleFilters.filters.category.map((category, index) => (
                    <SidebarListItem
                      key={index}
                      itemName={category}
                      selectedItems={categories}
                      handleItemChange={handleCategoryChange}
                    />
                  ))}
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
            <AccordionDetails sx={{ padding: 0 }} className="overflow-y-scroll max-h-44 scrollbar">
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={() => handleSelectAllChange('roles')}
                  >
                    <ListItemIcon sx={{ minWidth: '2rem' }}>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        size="small"
                        checked={selectAllRoles}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                        fontWeight: '500'
                      }}
                      className="text-[85rem]"
                      primary="Selecionar todos"
                    />
                  </ListItemButton>
                </ListItem>

                {possibleFilters &&
                  possibleFilters.filters.position.map((position, index) => (
                    <SidebarListItem
                      key={index}
                      itemName={position}
                      selectedItems={roles}
                      handleItemChange={handleRolesChange}
                    />
                  ))}
              </List>
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
            <AccordionDetails sx={{ padding: 0 }} className="overflow-y-scroll max-h-44 scrollbar">
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={() => handleSelectAllChange('departments')}
                  >
                    <ListItemIcon sx={{ minWidth: '2rem' }}>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        size="small"
                        checked={selectAllDepartments}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                        fontWeight: '500'
                      }}
                      className="text-[85rem]"
                      primary="Selecionar todos"
                    />
                  </ListItemButton>
                </ListItem>

                {possibleFilters &&
                  possibleFilters.filters.department.map((department, index) => (
                    <SidebarListItem
                      key={index}
                      itemName={department}
                      selectedItems={departments}
                      handleItemChange={handleDepartmentsChange}
                    />
                  ))}
              </List>
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
            <AccordionDetails sx={{ padding: 0 }} className="overflow-y-scroll max-h-44 scrollbar">
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={() => handleSelectAllChange('branches')}
                  >
                    <ListItemIcon sx={{ minWidth: '2rem' }}>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        size="small"
                        checked={selectAllBranches}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                        fontWeight: '500'
                      }}
                      className="text-[85rem]"
                      primary="Selecionar todos"
                    />
                  </ListItemButton>
                </ListItem>

                {possibleFilters &&
                  possibleFilters.filters.branch.map((branch, index) => (
                    <SidebarListItem
                      key={index}
                      itemName={branch}
                      selectedItems={branches}
                      handleItemChange={handleBranchesChange}
                    />
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <Button
        sx={{ fontSize: '0.9rem', padding: '0.4rem', borderRadius: '8px' }}
        variant="contained"
        fullWidth
        onClick={handleApplyFilters}
      >
        Aplicar Filtros
      </Button>
    </aside>
  );
}
