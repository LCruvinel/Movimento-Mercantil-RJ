CREATE SCHEMA IF NOT EXISTS bd_embarcacoes;

CREATE  TABLE bd_embarcacoes.cargo ( 
	id                   smallint generated by default as identity NOT NULL  ,
	cargo                varchar(30)    ,
	CONSTRAINT pk_cargo PRIMARY KEY ( id )
 );

CREATE  TABLE bd_embarcacoes.mercadoria ( 
	id                   smallint generated by default as identity NOT NULL  ,
	nome                 varchar(40)  NOT NULL  ,
	CONSTRAINT pk_mercadoria PRIMARY KEY ( id )
 );

CREATE  TABLE bd_embarcacoes.pais ( 
	id                   smallint generated by default as identity NOT NULL  ,
	pais                 varchar(50)  NOT NULL  ,
	gentilico            varchar(50)    ,
	CONSTRAINT pk_pais PRIMARY KEY ( id )
 );

CREATE  TABLE bd_embarcacoes.porto ( 
	id                   smallint generated by default as identity NOT NULL  ,
	nome                 varchar(50)  NOT NULL  ,
	id_pais              smallint    ,
	CONSTRAINT pk_porto PRIMARY KEY ( id ),
	CONSTRAINT fk01_porto FOREIGN KEY ( id_pais ) REFERENCES bd_embarcacoes.pais( id ) ON DELETE CASCADE

 );

CREATE  TABLE bd_embarcacoes.referencia_documental ( 
	id                   integer generated by default as identity NOT NULL  ,
	nome_periodico       varchar(50)  NOT NULL  ,
	CONSTRAINT pk_referencia_documental PRIMARY KEY ( id )
 );

CREATE  TABLE bd_embarcacoes.tipo_embarcacao ( 
	id                   smallint generated by default as identity NOT NULL  ,
	texto_descritivo     text  NOT NULL  ,
	tipo                 varchar(30)    ,
	CONSTRAINT pk_tipo_embarcacao PRIMARY KEY ( id )
 );

CREATE  TABLE bd_embarcacoes.titulo_nobreza ( 
	id                   smallint generated by default as identity NOT NULL  ,
	titulo               varchar(20)  NOT NULL  ,
	CONSTRAINT pk_titulo_nobreza PRIMARY KEY ( id )
 );

CREATE  TABLE bd_embarcacoes.unidade_de_medida ( 
	id                   smallint generated by default as identity NOT NULL  ,
	unidade_medida       varchar(15)    ,
	CONSTRAINT pk_unidade_de_medida PRIMARY KEY ( id )
 );

CREATE  TABLE bd_embarcacoes.embarcacao ( 
	id                   smallint generated by default as identity NOT NULL  ,
	id_tipo_embarcacao   smallint    ,
	nome                 varchar(50)  NOT NULL  ,
	id_pais               smallint    ,
	CONSTRAINT pk_embarcacao PRIMARY KEY ( id ),
	CONSTRAINT fk01_embarcacao FOREIGN KEY ( id_tipo_embarcacao ) REFERENCES bd_embarcacoes.tipo_embarcacao( id ) ON DELETE CASCADE  
 );

CREATE  TABLE bd_embarcacoes.imagem_embarcacao ( 
	id                   smallint generated by default as identity NOT NULL  ,
	imagem               varchar(150)  NOT NULL  ,
	id_tipo_embarcacao   smallint  NOT NULL  ,
	CONSTRAINT pk_imagem_embarcacao PRIMARY KEY ( id ),
	CONSTRAINT fk01_imagem_embarcacao FOREIGN KEY ( id_tipo_embarcacao ) REFERENCES bd_embarcacoes.tipo_embarcacao( id )   ON DELETE CASCADE
 );

CREATE  TABLE bd_embarcacoes.pessoa ( 
	id                   integer generated by default as identity NOT NULL  ,
	nome                 varchar(60)  NOT NULL  ,
	id_pais		         smallint    ,
	id_titulo_nobreza    smallint    ,
	CONSTRAINT pk_pessoa PRIMARY KEY ( id ),
	CONSTRAINT fk01_pessoa FOREIGN KEY ( id_titulo_nobreza ) REFERENCES bd_embarcacoes.titulo_nobreza( id )   ,
	CONSTRAINT fk02_pessoa FOREIGN KEY ( id_pais ) REFERENCES bd_embarcacoes.pais( id )   
 );

CREATE  TABLE bd_embarcacoes.minibiografia ( 
	id                   smallint generated by default as identity NOT NULL  ,
	id_pessoa            integer  NOT NULL  ,
	biografia            text    ,
	CONSTRAINT pk_minibiografia PRIMARY KEY ( id ),
	CONSTRAINT unq_minibiografia UNIQUE ( id_pessoa ) ,
	CONSTRAINT fk01_minibiografia FOREIGN KEY ( id_pessoa ) REFERENCES bd_embarcacoes.pessoa( id ) ON DELETE CASCADE  
 );
 
CREATE  TABLE bd_embarcacoes.relac_embarcacao_proprietario ( 
	id                   smallint generated by default as identity NOT NULL  ,
	id_embarcacao        integer  NOT NULL  ,
	id_proprietario      integer  NOT NULL  ,
	data_inicio          date    ,
	data_fim             date    ,
	id_pais             smallint    ,
	CONSTRAINT pk_relac_embarcacao_proprietario PRIMARY KEY ( id ),
	CONSTRAINT fk03_relac_embarcacao_proprietario FOREIGN KEY ( id_pais ) REFERENCES bd_embarcacoes.pais( id )   ,
	CONSTRAINT fk02_relac_embarcacao_proprietario FOREIGN KEY ( id_embarcacao ) REFERENCES bd_embarcacoes.embarcacao( id )   ON DELETE CASCADE,
	CONSTRAINT fk01_relac_embarcacao_proprietario FOREIGN KEY ( id_proprietario ) REFERENCES bd_embarcacoes.pessoa( id ) ON DELETE CASCADE  
 );

CREATE  TABLE bd_embarcacoes.relac_pessoa_cargo ( 
	id                   smallint generated by default as identity NOT NULL  ,
	id_cargo             smallint  NOT NULL  ,
	id_pessoa            integer  NOT NULL  ,
	data_cargo           date    ,
	ano                  smallint    ,
	CONSTRAINT pk_relac_pessoa_cargo PRIMARY KEY ( id ),
	CONSTRAINT unq_relac_pessoa_cargo UNIQUE ( id_cargo, id_pessoa ) ,
	CONSTRAINT fk02_relac_pessoa_cargo FOREIGN KEY ( id_cargo ) REFERENCES bd_embarcacoes.cargo( id )   ON DELETE CASCADE,
	CONSTRAINT fk01_relac_pessoa_cargo FOREIGN KEY ( id_pessoa ) REFERENCES bd_embarcacoes.pessoa( id ) ON DELETE CASCADE  
 );

CREATE  TABLE bd_embarcacoes.viagem ( 
	id                   smallint generated by default as identity NOT NULL  ,
	id_embarcacao        integer  NOT NULL  ,
	id_porto_origem      smallint  ,
	id_porto_destino     smallint  ,
	data_rio             date  NOT NULL  ,
	entrada_saida       varchar(7) NOT NULL,
	dias_viagem	     smallint    ,
	dias_porto_origem    smallint    ,
	data_chegada	     date       ,
	mestre               integer    ,
	capitao              integer    ,
	comandante           integer    ,
	armador              integer    ,
	consignatario	     integer     ,
	observacoes          text        ,
	CONSTRAINT pk_viagem PRIMARY KEY ( id ),
	CONSTRAINT fk08_viagem FOREIGN KEY ( consignatario ) REFERENCES bd_embarcacoes.pessoa( id )   ,
	CONSTRAINT fk07_viagem FOREIGN KEY ( armador ) REFERENCES bd_embarcacoes.pessoa( id )   ,
	CONSTRAINT fk06_viagem FOREIGN KEY ( comandante ) REFERENCES bd_embarcacoes.pessoa( id )   ,
	CONSTRAINT fk05_viagem FOREIGN KEY ( capitao ) REFERENCES bd_embarcacoes.pessoa( id )   ,
	CONSTRAINT fk04_viagem FOREIGN KEY ( mestre ) REFERENCES bd_embarcacoes.pessoa( id )   ,
	CONSTRAINT fk03_viagem FOREIGN KEY ( id_porto_destino ) REFERENCES bd_embarcacoes.porto( id )   ,
	CONSTRAINT fk02_viagem FOREIGN KEY ( id_porto_origem ) REFERENCES bd_embarcacoes.porto( id )   ,
	CONSTRAINT fk01_viagem FOREIGN KEY ( id_embarcacao ) REFERENCES bd_embarcacoes.embarcacao( id )   ,
	CONSTRAINT ck01_viagem CHECK (entrada_saida = ANY ('{Entrada, Sahida}'::text[]))	
 );
 
 CREATE  TABLE bd_embarcacoes.tipo_passageiro ( 
	id                   smallint generated by default as identity NOT NULL  ,
	tipo                 varchar(30) NOT NULL, 
	CONSTRAINT pk_tipo_passageiro PRIMARY KEY ( id ),
	CONSTRAINT unq_tipo_passageiro UNIQUE ( tipo )
 ); 

CREATE  TABLE bd_embarcacoes.passageiro ( 
	id                   smallint generated by default as identity NOT NULL  ,
	id_viagem            smallint  NOT NULL  ,
	id_tipo_passageiro	 smallint  NOT NULL  ,
	total                smallint  NOT NULL  ,
	observacoes          text    ,
	CONSTRAINT pk_passageiro PRIMARY KEY ( id ),
	CONSTRAINT unq_passageiro UNIQUE ( id_viagem, id_tipo_passageiro ) ,
	CONSTRAINT fk01_passageiro FOREIGN KEY ( id_viagem ) REFERENCES bd_embarcacoes.viagem( id ) ON DELETE CASCADE  ,
	CONSTRAINT fk02_passageiro FOREIGN KEY ( id_tipo_passageiro ) REFERENCES bd_embarcacoes.tipo_passageiro( id ) ON DELETE CASCADE  
 );
 
 CREATE  TABLE bd_embarcacoes.escala ( 
	id                   integer generated by default as identity NOT NULL  ,
	id_viagem            smallint  NOT NULL  ,
	id_porto             smallint  NOT NULL  ,
	data_escala          date    ,
	ano                  smallint    ,
	dias_porto           smallint    ,
	entrada_de_passageiros smallint DEFAULT 0   ,
	saida_de_passageiros smallint DEFAULT 0   ,
	observacoes          text    ,
	CONSTRAINT pk_escala PRIMARY KEY ( id ),
	CONSTRAINT unq_escala UNIQUE ( id_viagem, id_porto ) ,
	CONSTRAINT fk02_escala FOREIGN KEY ( id_porto ) REFERENCES bd_embarcacoes.porto( id )   ,
	CONSTRAINT fk01_escala FOREIGN KEY ( id_viagem ) REFERENCES bd_embarcacoes.viagem( id ) ON DELETE CASCADE  
 );

CREATE  TABLE bd_embarcacoes.arriba ( 
	id                   smallint generated by default as identity NOT NULL  ,
	id_escala            integer  NOT NULL  ,
	observacoes          text    ,
	CONSTRAINT pk_arriba PRIMARY KEY ( id ),
	CONSTRAINT fk01_arriba FOREIGN KEY ( id_escala ) REFERENCES bd_embarcacoes.escala( id ) ON DELETE CASCADE  
 ); 
 
CREATE  TABLE bd_embarcacoes.relac_mercadoria_escala ( 
	id                   smallint generated by default as identity NOT NULL  ,
	id_escala            integer  NOT NULL  ,
	id_mercadoria        smallint  NOT NULL  ,
	quantidade           integer    ,
	movimento            char(1)  NOT NULL  ,
	valor_frete          numeric(10,2)    ,
	id_unidade_medida    smallint    ,
	CONSTRAINT pk_relac_mercadoria_escala PRIMARY KEY ( id ),
	CONSTRAINT unq_relac_mercadoria_escala UNIQUE ( id_escala, id_mercadoria ) ,
	CONSTRAINT fk02_relac_mercadoria_escala FOREIGN KEY ( id_mercadoria ) REFERENCES bd_embarcacoes.mercadoria( id )   ,
	CONSTRAINT fk01_relac_mercadoria_escala FOREIGN KEY ( id_escala ) REFERENCES bd_embarcacoes.escala( id )  ON DELETE CASCADE ,
	CONSTRAINT fk03_relac_mercadoria_escala FOREIGN KEY ( id_unidade_medida ) REFERENCES bd_embarcacoes.unidade_de_medida( id )   
 );

ALTER TABLE bd_embarcacoes.relac_mercadoria_escala ADD CONSTRAINT cns_relac_mercadoria_escala CHECK ( (movimento = ANY (ARRAY['S'::bpchar, 'E'::bpchar])) );

CREATE  TABLE bd_embarcacoes.noticia ( 
	id                   smallint generated by default as identity NOT NULL  ,
	id_viagem            smallint  NOT NULL  ,
	assunto              text  NOT NULL  ,
	CONSTRAINT pk_noticia PRIMARY KEY ( id ),
	CONSTRAINT fk01_noticia FOREIGN KEY ( id_viagem ) REFERENCES bd_embarcacoes.viagem( id ) ON DELETE CASCADE  
 );

CREATE  TABLE bd_embarcacoes.relac_mercadoria_viagem ( 
	id                   integer generated by default as identity NOT NULL  ,
	id_viagem            smallint  NOT NULL  ,
	id_mercadoria        smallint  NOT NULL  ,
	quantidade_origem    integer    ,
	valor_frete          numeric(10,2)    ,
	id_unidade_medida    smallint    ,
	CONSTRAINT pk_relac_mercadoria_viagem PRIMARY KEY ( id ),
	CONSTRAINT unq_relac_mercadoria_viagem UNIQUE ( id_viagem, id_mercadoria ) ,
	CONSTRAINT fk02_relac_mercadoria_viagem FOREIGN KEY ( id_mercadoria ) REFERENCES bd_embarcacoes.mercadoria( id )   ,
	CONSTRAINT fk01_relac_mercadoria_viagem FOREIGN KEY ( id_viagem ) REFERENCES bd_embarcacoes.viagem( id )  ON DELETE CASCADE ,
	CONSTRAINT fk03_relac_mercadoria_viagem FOREIGN KEY ( id_unidade_medida ) REFERENCES bd_embarcacoes.unidade_de_medida( id )   
 );

CREATE  TABLE bd_embarcacoes.relac_viagem_referencia_doc ( 
	id                   smallint generated by default as identity NOT NULL  ,
	id_referencia_documental integer  NOT NULL  ,
	id_viagem            smallint  NOT NULL  ,
	data_publicacao      date    ,
	CONSTRAINT pk_relac_viagem_referencia_doc PRIMARY KEY ( id ),
	CONSTRAINT unq_relac_viagem_referencia_doc UNIQUE ( id_referencia_documental, id_viagem, data_publicacao ) ,
	CONSTRAINT fk02_relac_viagem_referencia_doc FOREIGN KEY ( id_referencia_documental ) REFERENCES bd_embarcacoes.referencia_documental( id )   ,
	CONSTRAINT fk01_relac_viagem_referencia_doc FOREIGN KEY ( id_viagem ) REFERENCES bd_embarcacoes.viagem( id ) ON DELETE CASCADE  
 );

COMMENT ON TABLE bd_embarcacoes.cargo IS 'guarda informações sobre os cargos de uma pessoa';

COMMENT ON COLUMN bd_embarcacoes.cargo.id IS 'número sequencial sem identificação';

COMMENT ON COLUMN bd_embarcacoes.cargo.cargo IS 'cargo que a pessoa ocupa (quando for uma pessoa física)';

COMMENT ON TABLE bd_embarcacoes.mercadoria IS 'guarda informações sobre as mercadorias transportadas pelas embarcações';

COMMENT ON COLUMN bd_embarcacoes.mercadoria.id IS 'número sequencial sem identificação';

COMMENT ON COLUMN bd_embarcacoes.mercadoria.nome IS 'nome da mercadoria';

COMMENT ON TABLE bd_embarcacoes.pais IS 'guarda informações sobre os paises e gentilicos';

COMMENT ON COLUMN bd_embarcacoes.pais.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.pais.pais IS 'nome do pais';

COMMENT ON COLUMN bd_embarcacoes.pais.gentilico IS 'gentílico do pais';

COMMENT ON TABLE bd_embarcacoes.porto IS 'guarda informações sobre os portos do século XVIII';

COMMENT ON COLUMN bd_embarcacoes.porto.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.porto.nome IS 'nome do porto';

COMMENT ON CONSTRAINT fk01_porto ON bd_embarcacoes.porto IS 'relacionamento com a tabela pais';

COMMENT ON TABLE bd_embarcacoes.referencia_documental IS 'jornais onde são  obtidas as informações sobre o movimento das embarcações nos portos do século XVIII';

COMMENT ON COLUMN bd_embarcacoes.referencia_documental.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.referencia_documental.nome_periodico IS 'nome do jornal';

COMMENT ON TABLE bd_embarcacoes.tipo_embarcacao IS 'guarda informações sobre os diferentes tipos de embarcações mercantis no século XVIII';

COMMENT ON COLUMN bd_embarcacoes.tipo_embarcacao.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.tipo_embarcacao.texto_descritivo IS 'texto explicativo de cada tipo de embarcação (pequeno resumo)';

COMMENT ON COLUMN bd_embarcacoes.tipo_embarcacao.tipo IS 'tipo de embarcação (ex. covert, etc)';

COMMENT ON TABLE bd_embarcacoes.titulo_nobreza IS 'guarda informações sobre os nomes dos títulos que uma pessoa pode ter';

COMMENT ON COLUMN bd_embarcacoes.titulo_nobreza.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.titulo_nobreza.titulo IS 'nome do título de nobreza';

COMMENT ON TABLE bd_embarcacoes.unidade_de_medida IS 'lista controlada das unidades de medidas possíveis para a mercadoria';

COMMENT ON COLUMN bd_embarcacoes.unidade_de_medida.id IS 'número sequencial sem significado, usado para identificar uma unidade de medida';

COMMENT ON COLUMN bd_embarcacoes.unidade_de_medida.unidade_medida IS 'nome da unidade de medida';

COMMENT ON TABLE bd_embarcacoes.embarcacao IS 'guarda informação sobre embarcações mercantis no século XVIII';

COMMENT ON COLUMN bd_embarcacoes.embarcacao.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.embarcacao.id_tipo_embarcacao IS 'código de identificação que identifica o tipo de embarcação';

COMMENT ON COLUMN bd_embarcacoes.embarcacao.nome IS 'nome da embarcação';

COMMENT ON COLUMN bd_embarcacoes.embarcacao.id_pais IS 'país de construção da embarcação';

COMMENT ON CONSTRAINT fk01_embarcacao ON bd_embarcacoes.embarcacao IS 'relacionamento com a tabela tipo_embarcação';

COMMENT ON TABLE bd_embarcacoes.imagem_embarcacao IS 'guarda informação sobre imagens dos diferentes tipos de embarcações mercantis no século XVIII';

COMMENT ON COLUMN bd_embarcacoes.imagem_embarcacao.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.imagem_embarcacao.imagem IS 'URL para as imagens em png, jpeg, etc. dos tipos das embarcações';

COMMENT ON COLUMN bd_embarcacoes.imagem_embarcacao.id_tipo_embarcacao IS 'código de identificação que indica o tipo da embarcação associada a imagem';

COMMENT ON CONSTRAINT fk01_imagem_embarcacao ON bd_embarcacoes.imagem_embarcacao IS 'relacionamento entre a imagem e o tipo de embarcação';

COMMENT ON TABLE bd_embarcacoes.pessoa IS 'guarda informações sobre os diferentes tipos de pessoas que aparecem no contexto do banco (ex. mestres, proprietários, etc.) - pode ser pessoa física ou jurídica';

COMMENT ON COLUMN bd_embarcacoes.pessoa.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.pessoa.nome IS 'nome completo da pessoa ou da empresa';

COMMENT ON COLUMN bd_embarcacoes.pessoa.id_titulo_nobreza IS 'código de identificação que indica o título de nobreza da pessoa (vazio se for o resgisto de uma empresa)';

COMMENT ON CONSTRAINT fk01_pessoa ON bd_embarcacoes.pessoa IS 'relacionamento entre pessoa e título_nobreza';

COMMENT ON CONSTRAINT fk02_pessoa ON bd_embarcacoes.pessoa IS 'nacionalidade (gentílico) da pessoa';

COMMENT ON TABLE bd_embarcacoes.relac_embarcacao_proprietario IS 'guarda informações sobre quais as pessoas que são proprietárias das embarcações (uma pessoa ou empresa pode ser dpna de mais de uma embarcação e uma embarcação pode ter mais de um dono ao longo do tempo)';

COMMENT ON COLUMN bd_embarcacoes.relac_embarcacao_proprietario.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.relac_embarcacao_proprietario.id_embarcacao IS 'código de identificação que indica uma embarcação';

COMMENT ON COLUMN bd_embarcacoes.relac_embarcacao_proprietario.id_proprietario IS 'código de identificação que indica uma pessoa ou empresa que é dona da embarcação com id_embarcacao';

COMMENT ON COLUMN bd_embarcacoes.relac_embarcacao_proprietario.data_inicio IS 'data de início da propriedade da embarcação';

COMMENT ON COLUMN bd_embarcacoes.relac_embarcacao_proprietario.data_fim IS 'data de fim da propriedade da embarcação';

COMMENT ON CONSTRAINT fk03_relac_embarcacao_proprietario ON bd_embarcacoes.relac_embarcacao_proprietario IS 'nome da bandeira (país/nacionalidade) da embarcação';

COMMENT ON CONSTRAINT fk02_relac_embarcacao_proprietario ON bd_embarcacoes.relac_embarcacao_proprietario IS 'relacionamento entre embarcação e pessoa (no papel de proprietário)';

COMMENT ON CONSTRAINT fk01_relac_embarcacao_proprietario ON bd_embarcacoes.relac_embarcacao_proprietario IS 'relacionamento entre embarcação e pessoa (no papel de proprietário)';

COMMENT ON CONSTRAINT unq_relac_pessoa_cargo ON bd_embarcacoes.relac_pessoa_cargo IS 'chave candidata: para a mesma pessoa, numa mesma data, não pode haver dois cargos registrados';

COMMENT ON TABLE bd_embarcacoes.relac_pessoa_cargo IS 'guarda informações que relacionam os cargos a pessoa, com a data com que essa pessoa tinha esse cargo. Uma mesma pessoa pode ter vários cargos ao longo do tempo';

COMMENT ON COLUMN bd_embarcacoes.relac_pessoa_cargo.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.relac_pessoa_cargo.id_cargo IS 'número de identificação do cargo da pessoa';

COMMENT ON COLUMN bd_embarcacoes.relac_pessoa_cargo.id_pessoa IS 'número de identificação da pessoa';

COMMENT ON COLUMN bd_embarcacoes.relac_pessoa_cargo.data_cargo IS 'data conhecida em que a pessoa tinha esse cargo';

COMMENT ON COLUMN bd_embarcacoes.relac_pessoa_cargo.ano IS 'ano que é conhecido em que a pessoa tem o cargo. Preenchido automaticamente se a data_cargo estiver preenchida';

COMMENT ON CONSTRAINT fk02_relac_pessoa_cargo ON bd_embarcacoes.relac_pessoa_cargo IS 'relacionamento com cargo';

COMMENT ON CONSTRAINT fk01_relac_pessoa_cargo ON bd_embarcacoes.relac_pessoa_cargo IS 'relacionamento com pessoa';

COMMENT ON TABLE bd_embarcacoes.viagem IS 'guarda informações das viagens cuja origem é o porto do Rio de Janeiro';

COMMENT ON COLUMN bd_embarcacoes.viagem.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.viagem.id_embarcacao IS 'código de identificação de uma embarcação';

COMMENT ON COLUMN bd_embarcacoes.viagem.id_porto_origem IS 'código de identificação do porto de origem da viagem (no caso: Rio de Janeiro)';

COMMENT ON COLUMN bd_embarcacoes.viagem.id_porto_destino IS 'código de identificação do porto de destino';

COMMENT ON COLUMN bd_embarcacoes.viagem.data_rio IS 'data da embarcação no porto do Rio de Janeiro';

COMMENT ON COLUMN bd_embarcacoes.viagem.entrada_saida IS 'entrada ou saída do porto do Rio de Janeiro';

COMMENT ON COLUMN bd_embarcacoes.viagem.dias_porto_origem IS 'número de dias em que a embarcação ficou no porto de origem';

COMMENT ON COLUMN bd_embarcacoes.viagem.mestre IS 'código de identificação do mestre da embarcação';

COMMENT ON COLUMN bd_embarcacoes.viagem.capitao IS 'código de identificação do capitão da embarcação';

COMMENT ON COLUMN bd_embarcacoes.viagem.comandante IS 'código de identificação do comandante da embarcação';

COMMENT ON COLUMN bd_embarcacoes.viagem.armador IS 'código de identificação do armador da embarcação';

COMMENT ON CONSTRAINT fk07_viagem ON bd_embarcacoes.viagem IS 'relacionamento entre viagem e pessoa (armador)';

COMMENT ON CONSTRAINT fk06_viagem ON bd_embarcacoes.viagem IS 'relacionamento entre viagem e pessoa (comandante)';

COMMENT ON CONSTRAINT fk05_viagem ON bd_embarcacoes.viagem IS 'relacionamento entre viagem e pessoa (capitão)';

COMMENT ON CONSTRAINT fk04_viagem ON bd_embarcacoes.viagem IS 'relacionamento entre viagem e pessoa (mestre)';

COMMENT ON CONSTRAINT fk03_viagem ON bd_embarcacoes.viagem IS 'relacionamento entre viagem e porto';

COMMENT ON CONSTRAINT fk02_viagem ON bd_embarcacoes.viagem IS 'relacionamento entre viagem e porto';

COMMENT ON CONSTRAINT fk01_viagem ON bd_embarcacoes.viagem IS 'relacionamento entre viagem e embarcação';

COMMENT ON TABLE bd_embarcacoes.escala IS 'guarda informações sobre os portos que as embarcações pararam ao longo da viagem';

COMMENT ON COLUMN bd_embarcacoes.escala.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.escala.id_viagem IS 'código de identificação da viagem';

COMMENT ON COLUMN bd_embarcacoes.escala.id_porto IS 'código de identificação do porto onde a embarcação fez escala';

COMMENT ON COLUMN bd_embarcacoes.escala.data_escala IS 'data da chegada da embarcação no porto';

COMMENT ON COLUMN bd_embarcacoes.escala.ano IS 'ano da chegada da embarcação no porto, preenchida automaticamente se a data tiver sido preenchida';

COMMENT ON COLUMN bd_embarcacoes.escala.dias_porto IS 'total de dias que a embarcação ficou ancorada';

COMMENT ON COLUMN bd_embarcacoes.escala.entrada_de_passageiros IS 'Guarda o número de passageiros a entrar na embarcação, nesta escala.';

COMMENT ON COLUMN bd_embarcacoes.escala.saida_de_passageiros IS 'Guarda o número de passageiros que estavam na embarcação e saíram nesta escala, quando a informação está disponível';

COMMENT ON CONSTRAINT fk02_escala ON bd_embarcacoes.escala IS 'relacionamento entre escala e porto';

COMMENT ON CONSTRAINT fk01_escala ON bd_embarcacoes.escala IS 'relacionamento entre escala e  viagem';

COMMENT ON TABLE bd_embarcacoes.noticia IS 'guarda informações sobre as notícias de uma embarcação no porto';

COMMENT ON COLUMN bd_embarcacoes.noticia.id IS 'número sequencial sem  significado';

COMMENT ON COLUMN bd_embarcacoes.noticia.id_viagem IS 'código de identificação da viagem';

COMMENT ON COLUMN bd_embarcacoes.noticia.assunto IS 'pequeno texto com a notícia sobre um navio no porto';

COMMENT ON CONSTRAINT fk01_noticia ON bd_embarcacoes.noticia IS 'relacionamento com viagem';

COMMENT ON CONSTRAINT cns_relac_mercadoria_escala ON bd_embarcacoes.relac_mercadoria_escala IS 'valores permitidos: ''S''';

COMMENT ON TABLE bd_embarcacoes.relac_mercadoria_escala IS 'guarda informações sobre as mercadorias que são transportadas ou deixadas nos portos da escala de uma viagem';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_escala.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_escala.id_escala IS 'código de identificação da escala de uma viagem';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_escala.id_mercadoria IS 'código de identificação da mercadoria da escala de uma viagem';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_escala.quantidade IS 'quantidade de mercadoria transportada na embarcação';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_escala.movimento IS 'informa se a mercadoria está a ser deixada (''S'') no porto ou colocada na embarcação (''E'')';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_escala.valor_frete IS 'valor do frete para pagar o transporte de mercadoria pela embarcação';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_escala.id_unidade_medida IS 'guarda informações sobre a unidade de medida das  mercadorias que são transportadas no início da viagem';

COMMENT ON CONSTRAINT cns_relac_mercadoria_escala ON bd_embarcacoes.relac_mercadoria_escala IS 'valores permitidos: ''S''';

COMMENT ON CONSTRAINT fk03_relac_mercadoria_escala ON bd_embarcacoes.relac_mercadoria_escala IS 'relacionamento com a pessoa  ou empresa no papel de  consignatário';

COMMENT ON CONSTRAINT fk02_relac_mercadoria_escala ON bd_embarcacoes.relac_mercadoria_escala IS 'relacionamento com a mercadoria';

COMMENT ON CONSTRAINT fk01_relac_mercadoria_escala ON bd_embarcacoes.relac_mercadoria_escala IS 'relacionamento com a escala';

COMMENT ON CONSTRAINT unq_relac_mercadoria_viagem ON bd_embarcacoes.relac_mercadoria_viagem IS 'chave candidata: id_viagem, id_mercadoria';

COMMENT ON TABLE bd_embarcacoes.relac_mercadoria_viagem IS 'guarda informações sobre a mercadorias que são transportadas desde o início da viagem';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_viagem.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_viagem.id_viagem IS 'código de identificação da viagem';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_viagem.id_mercadoria IS 'código de identificação da mercadoria transportada na embarcação no início da viagem';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_viagem.quantidade_origem IS 'quantidade de mercadoria transportada na embarcação no início da viagem';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_viagem.valor_frete IS 'valor do frete para pagar o transporte da mercadoria pela embarcação';

COMMENT ON COLUMN bd_embarcacoes.relac_mercadoria_viagem.id_unidade_medida IS 'indica a unidade de medida para a mercadoria a ser transportada na embarcação';

COMMENT ON CONSTRAINT fk03_relac_mercadoria_viagem ON bd_embarcacoes.relac_mercadoria_viagem IS 'relacionamento com pessoa (no papel de consignatário)';

COMMENT ON CONSTRAINT fk02_relac_mercadoria_viagem ON bd_embarcacoes.relac_mercadoria_viagem IS 'relacionamento com mercadoria';

COMMENT ON CONSTRAINT fk01_relac_mercadoria_viagem ON bd_embarcacoes.relac_mercadoria_viagem IS 'relacionamento com viagem';

COMMENT ON CONSTRAINT unq_relac_viagem_referencia_doc ON bd_embarcacoes.relac_viagem_referencia_doc IS 'chave candidata: para a mesma viagem não pode haver dois registos sobre o mesmo jornal numa mesma data';

COMMENT ON TABLE bd_embarcacoes.relac_viagem_referencia_doc IS 'guarda informações sobre as referências documentais (jornais) onde se obtém as informações sobre as viagens e ambarcações no porto';

COMMENT ON COLUMN bd_embarcacoes.relac_viagem_referencia_doc.id IS 'número sequencial sem significado';

COMMENT ON COLUMN bd_embarcacoes.relac_viagem_referencia_doc.id_referencia_documental IS 'código de identificação da referência documental';

COMMENT ON COLUMN bd_embarcacoes.relac_viagem_referencia_doc.id_viagem IS 'código de identificação da viagem';

COMMENT ON COLUMN bd_embarcacoes.relac_viagem_referencia_doc.data_publicacao IS 'data da publicação da notícia sobre a viagem';

COMMENT ON CONSTRAINT fk02_relac_viagem_referencia_doc ON bd_embarcacoes.relac_viagem_referencia_doc IS 'relacionamento com a referência documental';

COMMENT ON CONSTRAINT fk01_relac_viagem_referencia_doc ON bd_embarcacoes.relac_viagem_referencia_doc IS 'relacionamento com a viagem';
