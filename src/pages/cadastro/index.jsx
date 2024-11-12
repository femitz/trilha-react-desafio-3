import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import { useForm } from "react-hook-form";
import {
  Container,
  Title,
  Column,
  Wrapper,
  FazerLogin,
  TitleCadastro,
  SubtitleCadastro,
  TermosDeUso,
} from "./styles";

const Cadastro = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.post(
        `/users`, {
          id: null,
          name: formData.nome,
          email: formData.email,
          senha: formData.senha
        }
      );

      navigate('/feed')
    } catch (e) {
      //TODO: HOUVE UM ERRO
    }
  };

  console.log("errors", errors);

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleCadastro>Comece agora grátis</TitleCadastro>
            <SubtitleCadastro>
              Crie sua conta e make the change._
            </SubtitleCadastro>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Nome completo"
                leftIcon={<MdPerson color="purple" />}
                name="nome"
                control={control}
              />
              {errors.nome && <span>O nome é obrigatório</span>}
              <Input
                placeholder="E-mail"
                leftIcon={<MdEmail color="purple" />}
                name="email"
                control={control}
              />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input
                type="password"
                placeholder="Senha"
                leftIcon={<MdLock color="purple" />}
                name="senha"
                control={control}
              />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button
                title="Criar Minha conta"
                variant="secondary"
                type="submit"
              />
            </form>
            <Column>
              <TermosDeUso>
                Ao clicar em "criar minha conta grátis", declaro que aceito as
                Políticas de Privacidade e os Termos de Uso da DIO.
              </TermosDeUso>
              <FazerLogin>Fazer Login</FazerLogin>
            </Column>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Cadastro };
